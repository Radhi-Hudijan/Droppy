import express from "express";
import {
  createJob,
  getDelivererAvailableJobs,
  getAllJobs,
} from "../controllers/job.js";

const jobRouter = express.Router();

jobRouter.get("/", getAllJobs);

jobRouter.get("/available-jobs-for-deliverer", getDelivererAvailableJobs);

jobRouter.post("/create", createJob);

export default jobRouter;
