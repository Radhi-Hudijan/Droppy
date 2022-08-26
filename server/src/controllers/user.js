import User, { validateUser, validateUserUpdate } from "../models/User.js";
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

// Find One user
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json({
      success: true,
      result: {
        name: user.name,
        surname: user.surname,
        email: user.email,
        vehicleInfo: {
          contact: user.vehicleInfo.contact,
          plate: user.vehicleInfo.plate,
          width: user.vehicleInfo.width,
          length: user.vehicleInfo.length,
          height: user.vehicleInfo.height,
        },
      },
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get user, try again later" });
  }
};

// Update One User
export const updateUser = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "The user does not exist",
      });
    }

    user.name = req.body.user.name
      ? makeFirstLetterUpper(req.body.user.name)
      : user.name;
    user.surname = req.body.user.surname
      ? makeFirstLetterUpper(req.body.user.surname)
      : user.surname;
    user.email = req.body.user.email
      ? req.body.user.email.toLowerCase()
      : user.email;
    user.vehicleInfo = req.body.user.vehicleInfo
      ? req.body.user.vehicleInfo
      : user.vehicleInfo;
    user.password = req.body.user.password
      ? req.body.user.password
      : user.password;

    const userToValidate = {
      name: user.name,
      surname: user.surname,
      email: user.email,
    };

    const { error } = validateUserUpdate(userToValidate);
    if (error) {
      return res.status(400).send({
        message: `${error.details[0].message} field fails to match the required pattern`,
      });
    }
    await user.save();
    res.status(200).json({
      success: true,
      result: user,
      message: "User profile updated successfully",
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      message: "Unable to update the profile, try again later",
    });
  }
};

// Delete One User
export const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "Profile was successfully deleted" });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      message: "Unable to delete profile, try again later",
    });
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

function makeFirstLetterUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
