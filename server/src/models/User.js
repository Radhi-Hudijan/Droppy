import mongoose from "mongoose";
// import validateAllowedFields from "../util/validateAllowedFields.js";
import jwt from "jsonwebtoken";
import passwordComplexity from "joi-password-complexity";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  vehicleInfo: {
    contact: { type: String },
    plateNum: { type: String },
    width: { type: Number, min: 1 },
    height: { type: Number, min: 1 },
    length: { type: Number, min: 1 },
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("users", userSchema);

export const validateUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
    name: Joi.string().required().label("Name"),
    surname: Joi.string().required().label("Surname"),
  });
  return schema.validateUser(data);
};

export default User;
// import mongoose from "mongoose";

// import validateAllowedFields from "../util/validateAllowedFields.js";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
// });

// const User = mongoose.model("users", userSchema);

// export const validateUser = (userObject) => {
//   const errorList = [];
//   const allowedKeys = ["name", "email"];

//   const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

//   if (validatedKeysMessage.length > 0) {
//     errorList.push(validatedKeysMessage);
//   }

//   if (userObject.name == null) {
//     errorList.push("name is a required field");
//   }

//   if (userObject.email == null) {
//     errorList.push("email is a required field");
//   }

//   return errorList;
// };

// export default User;
