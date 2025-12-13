import type { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const authenticateHidden = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.session.userId) {
      next();
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
