import Job from "../models/Job.js";
import { logError } from "../util/logging.js";
import { categories } from "../routes/categories.js";

const ITEMS_PER_PAGE = 5;

export const getAllJobs = async (req, res) => {
  const { page, width, height, length, dateStart, dateEnd, category } =
    req.query;
  const pageQuery = page || 1;
  const widthQuery = width || 10000;
  const heightQuery = height || 10000;
  const lengthQuery = length || 10000;
  const dateStartQuery = dateStart || new Date(new Date().setHours(0, 0, 0, 0));
  const dateEndQuery = dateEnd || new Date("2032-08-23");
  const categoryQuery = category || {
    $in: categories.map((category) => category.toUpperCase()),
  };

  const query = {
    width: { $lte: widthQuery },
    height: { $lte: heightQuery },
    length: { $lte: lengthQuery },
    date: { $gte: dateStartQuery, $lte: dateEndQuery },
    category: categoryQuery,
  };

  const skip = (pageQuery - 1) * ITEMS_PER_PAGE;

  try {
    const count = await Job.countDocuments(query);

    if (count === 0) {
      return res.status(404).json({
        success: false,
        message: "There is no result!",
      });
    }

    const jobs = await Job.find(query)
      .sort({ date: 1 })
      .limit(ITEMS_PER_PAGE)
      .skip(skip);

    const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

    res.status(200).json({
      success: true,
      result: { jobs, pagination: { count, pageCount } },
      message: "The job is brought successfully",
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, message: "Unable to get jobs, try again later" });
  }
};

export const getActiveJobs = async (req, res) => {
  const { page, width, height, length, dateStart, dateEnd, category } =
    req.query;
  const pageQuery = page || 1;
  const widthQuery = width || 10000;
  const heightQuery = height || 10000;
  const lengthQuery = length || 10000;
  const dateStartQuery = dateStart || new Date(new Date().setHours(0, 0, 0, 0));
  const dateEndQuery = dateEnd || new Date("2032-08-23");
  const categoryQuery = category || {
    $in: categories.map((category) => category.toUpperCase()),
  };
  const skip = (pageQuery - 1) * ITEMS_PER_PAGE;

  try {
    let query = {
      width: { $lte: widthQuery },
      height: { $lte: heightQuery },
      length: { $lte: lengthQuery },
      date: { $gte: dateStartQuery, $lte: dateEndQuery },
      category: categoryQuery,
    };

    req.body.isDriver !== "true"
      ? (query.senderID = req.body.userID)
      : (query.delivererIDs = req.body.userID);

    const activeJobs = await Job.find(query)
      .sort({ date: 1 })
      .limit(ITEMS_PER_PAGE)
      .skip(skip);

    const count = await Job.countDocuments(query);

    if (count === 0) {
      if (Object.keys(req.query).length === 1) {
        return res.status(404).json({
          success: false,
          message: "There is no job yet!",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "There is no result!",
        });
      }
    }

    const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

    res.status(200).json({
      success: true,
      message: "Active jobs are brought successfully",
      result: {
        jobs: activeJobs,
        pagination: { count, pageCount },
      },
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, message: "Unable to get jobs, try again later" });
  }
};

export const getOneJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findOne({ _id: id });

    res.status(200).json({
      success: true,
      result: job,
      message: "The job is brought successfully",
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, message: "Unable to get jobs, try again later" });
  }
};
