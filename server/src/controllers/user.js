import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { user } = req.body;
    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user
        )}`,
      });
    }

    const email = await User.findOne({ email: user.email });
    if (email) {
      return res
        .status(409)
        .send({ message: "user with given email already exist!" });
    }
    const { error } = validateUser(user);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(user.password, salt);

    await new User({ ...user, password: hashPassword }).save();
    res
      .status(201)
      .send({ message: "User created successfully", success: true });
    // send these on successful sign up
    // const token = user.generateAuthToken();
    // return res.status(200).send({
    //   data: token,
    //   email: req.body.email,
    //   name: user.name,
    //   surname: user.surname,
    //   vehicleInfo: user.vehicleInfo,
    //   success: true,
    //   message: "Logged In",
    // });
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error while creating user" });
  }
};

export const addCar = async (req, res) => {
  try {
    const { vehicleInfo } = req.body;
    const user = await User.findOne({ email: vehicleInfo.email });
    user.vehicleInfo.contact = vehicleInfo.contact;
    user.vehicleInfo.plate = vehicleInfo.plate;
    user.vehicleInfo.width = vehicleInfo.width;
    user.vehicleInfo.height = vehicleInfo.height;
    user.vehicleInfo["length"] = vehicleInfo["length"];
    await user.save();
    res.status(200).send({ message: "success", success: true, result: user });
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error while updating the user" });
  }
};
