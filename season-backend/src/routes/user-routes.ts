import express from "express";
const router = express.Router();
import { z } from "zod";
import { validateData } from "../middleware/validate.js";

import {
  getUser,
  saveUser,
  loginUser,
} from "../controllers/user-controllers.js";
import authenticate from "../middleware/authenticate.js";

const registerSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[^\w\s]/, "Password must contain at least 1 special character")
    .regex(/[^0-9]/, "Password must contain at least 1 number"),
});

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});

router.get("/", authenticate, getUser);
router.post("/", validateData(registerSchema), saveUser);
router.post("/auth", validateData(loginSchema), loginUser);

export default router;
