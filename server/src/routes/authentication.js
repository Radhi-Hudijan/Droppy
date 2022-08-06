import express from "express";
import { authenticate } from "../controllers/authentication.js";

const authRouter = express.Router();

authRouter.post("/", authenticate);

export default authRouter;
