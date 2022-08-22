import Job from "../models/Job.js";
import { logError } from "../util/logging.js";

const ITEMS_PER_PAGE = 5;

export const getAllJobs = async (req, res) => {
  const page = req.query.page || 1;

  // Put all your query params in here
  const query = {};

  const skip = (page - 1) * ITEMS_PER_PAGE;
  try {
    const count = await Job.countDocuments(query);

    // await Job.deleteMany();
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

export const getActiveJobs = async (req, res) => {
  const page = req.query.page || 1;

  const skip = (page - 1) * ITEMS_PER_PAGE;

  try {
    let query;

    if (req.body.isDriver !== "true") {
      query = {
        senderID: req.body.userID,
      };
    } else {
      query = {
        delivererIDs: req.body.userID,
      };
    }
    const activeJobs = await Job.find(query)
      .sort({ date: 1 })
      .limit(ITEMS_PER_PAGE)
      .skip(skip);

    const count = await Job.countDocuments(query);

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
