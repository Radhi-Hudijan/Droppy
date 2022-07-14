import express from "express";
import { createUser, getUsers, addCar } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.post("/create", createUser);

userRouter.patch("/create/add-car", addCar);

export default userRouter;
