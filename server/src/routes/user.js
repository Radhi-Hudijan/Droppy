import express from "express";
import {
  createUser,
  getUsers,
  addCar,
  getUser,
  deleteUser,
  updateUser,
  getAcceptedDrivers,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.post("/create", createUser);

userRouter.patch("/create/add-car", addCar);

userRouter.get("/:id", getUser);

userRouter.delete("/:id", deleteUser);

userRouter.patch("/:id", updateUser);

userRouter.get("/", getAcceptedDrivers);

export default userRouter;
