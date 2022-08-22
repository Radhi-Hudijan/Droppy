import Job, { validateJob } from "../models/Job.js";
// import User from "../models/User.js";
import { logError } from "../util/logging.js";

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

    job.item = req.body.job.item
      ? makeFirstLetterUpper(req.body.job.item)
      : job.item;
    job.description = req.body.job.description
      ? makeFirstLetterUpper(req.body.job.description)
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
    job.category = req.body.job.category ? req.body.job.category : job.category;
    const jobToValidate = {
      item: job.item,
      description: job.description,
      fromPostCode: job.fromPostCode,
      toPostCode: job.toPostCode,
      width: job.width,
      height: job.height,
      length: job["length"],
      date: job.date,
      phoneNo: job.phoneNo,
      senderID: job.senderID,
      category: job.category,
    };
    const { error } = validateJob(jobToValidate);
    if (error) {
      return res.status(400).send({
        message: `${error.details[0].path} field fails to match the required pattern`,
      });
    }
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

export const acceptCancelJob = async (req, res) => {
  try {
    let job = await Job.findOne({ _id: req.params.id });
    if (!job) {
      res.status(404).json({
        success: false,
        message: "The job is not found",
      });
    }
    if (job.delivererIDs.includes(req.body.job.delivererID)) {
      job.delivererIDs = job.delivererIDs.filter(
        (id) => id !== req.body.job.delivererID
      );
    } else {
      job.delivererIDs.push(req.body.job.delivererID);
    }

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

    job.item = makeFirstLetterUpper(job.item);
    job.description = makeFirstLetterUpper(job.description);

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
function makeFirstLetterUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
