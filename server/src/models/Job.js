import mongoose from "mongoose";
import Joi from "joi";
import joiPhoneNumber1 from "joi-phone-number";
const joiPhoneNumber = Joi.extend(joiPhoneNumber1);

const jobSchema = new mongoose.Schema({
  senderID: { type: String },
  delivererID: { type: String },
  item: { type: String, required: true },
  description: { type: String, required: true },
  fromPostCode: { type: String, required: true },
  toPostCode: { type: String, required: true },
  width: { type: Number, min: 1, required: true },
  height: { type: Number, min: 1, required: true },
  length: { type: Number, min: 1, required: true },
  date: { type: Date, required: true },
  phoneNo: { type: String, required: true },
});

const Job = mongoose.model("jobs", jobSchema);

export const validateJob = (data) => {
  const schema = Joi.object({
    senderID: Joi.string().min(1).required().label("senderID"),
    item: Joi.string().min(1).required().label("item"),
    description: Joi.string().min(1).required().label("description"),
    fromPostCode: Joi.string()
      .pattern(/^(?:NL-)?(\d{4})\s*([A-Z]{2})$/i)
      .required()
      .label("fromPostCode"),
    toPostCode: Joi.string()
      .pattern(/^(?:NL-)?(\d{4})\s*([A-Z]{2})$/i)
      .required()
      .label("toPostCode"),
    width: Joi.number().integer().min(1).required().label("width"),
    height: Joi.number().integer().min(1).required().label("height"),
    length: Joi.number().integer().min(1).required().label("length"),
    date: Joi.date().greater("now").required().label("date"),
    phoneNo: joiPhoneNumber
      .string()
      .phoneNumber({ defaultCountry: "NL", format: "national" })
      .required()
      .label("phoneNo"),
  });
  return schema.validate(data);
};

export default Job;
