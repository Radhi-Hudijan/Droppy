import Job, { validateJob } from "../models/Job.js";
import { logError } from "../util/logging.js";

export const getAllJobs = async (req, res) => {
  const ITEMS_PER_PAGE = 20;
  const page = req.query.page || 1;

  // Put all your query params in here
  const query = {};

  try {
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const count = await Job.estimatedDocumentCount(query);

    // await Job.deleteMany();
    const jobs = await Job.find(query).limit(ITEMS_PER_PAGE).skip(skip);

    const pageCount = count / ITEMS_PER_PAGE;

    res
      .status(200)
      .json({ success: true, result: jobs, pagination: { count, pageCount } });
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
      $or: [{ delivererID: req.body.userID }, { senderID: req.body.userID }],
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
