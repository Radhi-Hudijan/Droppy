import Job from "../models/Job.js";
import User from "../models/User.js";
import { logError } from "../util/logging.js";

export const countJobs = async (req, res) => {
  try {
    const total = await Job.countDocuments({});

    const available = await Job.countDocuments({
      delivererIDs: [],
    });
    const senders = await User.countDocuments({});
    const deliverers = await User.countDocuments({
      vehicleInfo: { $ne: null },
    });

    const taken = total - available;

    const result = {
      numOfTotalJobs: total,
      numOfAvailableJobs: available,
      numOfTakenJobs: taken,
      numOfSenders: senders,
      numOfDeliverers: deliverers,
    };

    res.status(200).json({ success: true, result: result });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get values, try again later" });
  }
};
