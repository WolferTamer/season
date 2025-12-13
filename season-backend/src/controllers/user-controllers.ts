import User from "../models/user.js";
import type { Request, Response, NextFunction } from "express";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(201).json(user.toJSON());
    } else {
      res.sendStatus(404);
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const saveUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create({
      username: "bob",
      encrypted_password: "10515",
      email: "example@example.com",
    });
    res.status(201).json(user.toJSON());
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
