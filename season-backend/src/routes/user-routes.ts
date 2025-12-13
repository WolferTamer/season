import express from "express";
const router = express.Router();

import { getUser, saveUser } from "../controllers/user-controllers.js";

router.get("/:id", getUser);
router.post("/", saveUser);

export default router;
