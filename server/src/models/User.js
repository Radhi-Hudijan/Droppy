import mongoose from "mongoose";
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
    plate: { type: String },
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
  return schema.validate(data);
};

export const validateUserUpdate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    name: Joi.string().required().label("Name"),
    surname: Joi.string().required().label("Surname"),
  });
  return schema.validate(data);
};

export default User;
