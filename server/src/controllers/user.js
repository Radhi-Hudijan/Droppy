import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
// import validationErrorMessage from "../util/validationErrorMessage.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("users", users);
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
    console.log("=========user", req.body.user);
    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user
        )}`,
      });
    }

    const email = await User.findOne({ email: req.body.user.email });
    if (email) {
      return res
        .status(409)
        .send({ message: "user with given email already exist!" });
    }
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "internal server error" });
  }
};

export const addCar = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    user.vehicleInfo.contact = req.body.vehicleInfo.contact;
    user.vehicleInfo.plate = req.body.vehicleInfo.plate;
    user.vehicleInfo.width = req.body.vehicleInfo.width;
    user.vehicleInfo.height = req.body.vehicleInfo.height;
    user.vehicleInfo.length = req.body.vehicleInfo.length;
    // console.log(user);
    await user.save();
    res.status(200).send({ message: "success", result: user });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

// -----------------------------------------------------------------------
// import User, { validateUser } from "../models/User.js";
// import { logError } from "../util/logging.js";
// import validationErrorMessage from "../util/validationErrorMessage.js";

// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({ success: true, result: users });
//   } catch (error) {
//     logError(error);
//     res
//       .status(500)
//       .json({ success: false, msg: "Unable to get users, try again later" });
//   }
// };

// export const createUser = async (req, res) => {
//   try {
//     const { user } = req.body;

//     if (typeof user !== "object") {
//       res.status(400).json({
//         success: false,
//         msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
//           user
//         )}`,
//       });

//       return;
//     }

//     const errorList = validateUser(user);

//     if (errorList.length > 0) {
//       res
//         .status(400)
//         .json({ success: false, msg: validationErrorMessage(errorList) });
//     } else {
//       const newUser = await User.create(user);

//       res.status(201).json({ success: true, user: newUser });
//     }
//   } catch (error) {
//     logError(error);
//     res
//       .status(500)
//       .json({ success: false, msg: "Unable to create user, try again later" });
//   }
// };
