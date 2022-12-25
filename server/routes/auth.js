import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

// "/login" is appending to "/auth" so it will look
// like "/auth/login"
router.post("/login", login);

export default router;
