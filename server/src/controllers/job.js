import Job, { validateJob } from "../models/Job.js";
import { logError } from "../util/logging.js";

export const getAllJobs = async (req, res) => {
  try {
    // await Job.deleteMany();
    const jobs = await Job.find();
    res.status(200).json({ success: true, result: jobs });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get jobs, try again later" });
  }
};
export const getActiveJobs = async (req, res) => {
  try {
    const activeJobs = await Job.find({
      $or: [{ delivererIDs: req.body.userID }, { senderID: req.body.userID }],
    });
    res.status(200).json({ success: true, result: activeJobs });
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
