import express from "express";
import { logError } from "../util/logging.js";

const categoriesRouter = express.Router();

export const categories = ["Electronics", "Furniture", "Other"];

const getCategories = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      result: categories,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      message: "Unable to get categories, try again later",
    });
  }
};

categoriesRouter.get("/", getCategories);

export default categoriesRouter;
