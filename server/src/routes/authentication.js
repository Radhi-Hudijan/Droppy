import express from "express";
import { authenticate } from "../controllers/authentication";

const userRouter = express.Router();

userRouter.post("/", authenticate);

export default userRouter;
