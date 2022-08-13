import Job, { validateJob } from "../models/Job.js";
import User from "../models/User.js";
import { logError } from "../util/logging.js";

const ITEMS_PER_PAGE = 5;

export const getAllJobs = async (req, res) => {
  const page = req.query.page || 1;

  // Put all your query params in here
  const query = {};

  const skip = (page - 1) * ITEMS_PER_PAGE;
  try {
    const count = await Job.estimatedDocumentCount(query);

    // await Job.deleteMany();
    const jobs = await Job.find(query).limit(ITEMS_PER_PAGE).skip(skip);

    const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

    res.status(200).json({
      success: true,
      result: { jobs, pagination: { count, pageCount } },
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get jobs, try again later" });
  }
};

export const getOneJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.find({ _id: id });

    res.status(200).json({
      success: true,
      result: job,
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get jobs, try again later" });
  }
};

export const getActiveJobs = async (req, res) => {
  const page = req.query.page || 1;

  const skip = (page - 1) * ITEMS_PER_PAGE;

  try {
    let activeJobs;
    const user = await User.find({ _id: req.body.userID });
    if (!user.vehicleInfo) {
      activeJobs = await Job.find({
        senderID: req.body.userID,
      })
        .limit(ITEMS_PER_PAGE)
        .skip(skip);
    } else {
      activeJobs = await Job.find({
        delivererIDs: req.body.userID,
      })
        .limit(ITEMS_PER_PAGE)
        .skip(skip);
    }

    const count = activeJobs.length;

    const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

    res.status(200).json({
      success: true,
      result: { jobs: activeJobs, pagination: { count, pageCount } },
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get jobs, try again later" });
  }
};
export const deleteJob = async (req, res) => {
  try {
    await Job.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, msg: "Job is removed successfully" });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get jobs, try again later" });
  }
};
export const updateJob = async (req, res) => {
  try {
    let job = await Job.find({ _id: req.params.id });
    job = {
      ...job,
      ...req.body.job,
      delivererIDs: req.body.delivererIDs
        ? req.body.delivererIDs.concat(job.delivererIDs)
        : job.delivererIDs,
    };
    // job.item = req.body.job.item;
    // job.description = req.body.job.description;
    // job.fromPostCode = req.body.job.fromPostCode;
    // job.toPostCode = req.body.job.toPostCode;
    // job.width = req.body.job.width;
    // job.height = req.body.job.height;
    // job.date = req.body.job.date;
    // job["length"] = req.body.job["length"];
    // job.phoneNo = req.body.job.phoneNo;
    // job.senderID = req.body.job.senderID;

    await job.save();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ success: true, msg: "Job is updated successfully" });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get jobs, try again later" });
  }
};

export const createJob = async (req, res) => {
  try {
    const { job } = req.body;
    if (typeof job !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'job' object. Received: ${JSON.stringify(
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
