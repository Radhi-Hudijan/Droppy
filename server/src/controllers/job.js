import Job, { validateJob } from "../models/Job.js";
// import User from "../models/User.js";
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
    const jobs = await Job.find(query).limit(ITEMS_PER_PAGE).skip(skip);

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
    const activeJobs = await Job.find(query).limit(ITEMS_PER_PAGE).skip(skip);

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

export const deleteJob = async (req, res) => {
  try {
    await Job.deleteOne({ _id: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "Job is removed successfully" });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, message: "Unable to get jobs, try again later" });
  }
};

export const updateJob = async (req, res) => {
  try {
    let job = await Job.findOne({ _id: req.params.id });
    if (!job) {
      res.status(404).json({
        success: false,
        message: "The job is not found",
      });
    }
    // job = {
    //   ...job,
    //   ...req.body.job,
    // };

    job.item = req.body.job.item ? req.body.job.item.toUpperCase() : job.item;
    job.description = req.body.job.description
      ? req.body.job.description.toUpperCase()
      : job.description;
    job.fromPostCode = req.body.job.fromPostCode
      ? req.body.job.fromPostCode.toUpperCase()
      : job.fromPostCode;
    job.toPostCode = req.body.job.toPostCode
      ? req.body.job.toPostCode.toUpperCase()
      : job.toPostCode;
    job.width = req.body.job.width ? req.body.job.width : job.width;
    job.height = req.body.job.height ? req.body.job.height : job.height;
    job.date = req.body.job.date ? req.body.job.date : job.date;
    job["length"] = req.body.job["length"]
      ? req.body.job["length"]
      : job["length"];
    job.phoneNo = req.body.job.phoneNo ? req.body.job.phoneNo : job.phoneNo;
    job.senderID = req.body.job.senderID ? req.body.job.senderID : job.senderID;
    job.delivererIDs = req.body.job.delivererIDs
      ? req.body.job.delivererIDs.concat(job.delivererIDs)
      : job.delivererIDs;

    await job.save();
    res.status(200).json({
      success: true,
      result: job,
      message: "Job is updated successfully",
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      message: "Unable to get the job, try again later",
    });
  }
};

export const createJob = async (req, res) => {
  try {
    const { job } = req.body;
    if (typeof job !== "object") {
      res.status(400).json({
        success: false,
        message: `You need to provide a 'job' object. Received: ${JSON.stringify(
          job
        )}`,
      });
    }
    const { error } = validateJob(job);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    await new Job({ ...job }).save();
    res
      .status(201)
      .send({ message: "Job created successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error while creating job" });
  }
};
