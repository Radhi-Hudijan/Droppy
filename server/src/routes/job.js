import express from "express";
import {
  createJob,
  deleteJob,
  updateJob,
  getActiveJobs,
  getAllJobs,
} from "../controllers/job.js";

const jobRouter = express.Router();

jobRouter.get("/", getAllJobs);

jobRouter.post("/", getActiveJobs);

jobRouter.delete("/", deleteJob);

jobRouter.put("/", updateJob);

jobRouter.post("/create", createJob);

export default jobRouter;
