import express from "express";
import {
  createJob,
  getAllJobs,
  getMyAvailableJobs,
} from "../controllers/job.js";

const jobRouter = express.Router();

jobRouter.get("/", getAllJobs);

jobRouter.get("/myAvailableJobs", getMyAvailableJobs);

jobRouter.post("/create", createJob);

export default jobRouter;
