import User from "../models/user.js";
import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

interface IRegister {
  email: string;
  username: string | undefined;
  password: string | undefined;
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.session.userId!);
    if (user) {
      res.status(201).json(user.toJSON());
    } else {
      res.sendStatus(404);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const saveUser = async (
  req: Request<{}, {}, IRegister>,
  res: Response
) => {
  try {
    const hashed_pass = await bcrypt.hash(req.body.password!, 15);

    const user = await User.create({
      email: req.body.email,
      username: req.body.username!,
      encrypted_password: hashed_pass,
    });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const loginUser = async (
  req: Request<{}, {}, IRegister>,
  res: Response
) => {
  try {
    const user = await User.findOne({ email: req.body.email! })
      .select("+encrypted_password")
      .exec();
    if (user) {
      console.log(req.body.password);
      console.log(user.encrypted_password);
      const match = await bcrypt.compare(
        req.body.password!,
        user.encrypted_password
      );
      if (match) {
        req.session.userId = user._id;
        req.session.username = user.username;
        res.status(200).send();
      } else {
        res.status(401).send();
      }
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
