import express from "express";
import {
  createJob,
  deleteJob,
  updateJob,
  getActiveJobs,
  getAllJobs,
  getOneJob,
} from "../controllers/job.js";

const jobRouter = express.Router();

jobRouter.get("/", getAllJobs);

jobRouter.post("/", getActiveJobs);

jobRouter.get("/:id", getOneJob);

jobRouter.delete("/:id", deleteJob);

// jobRouter.put("/:id", updateJob);

jobRouter.patch("/:id", updateJob);

jobRouter.post("/create", createJob);

export default jobRouter;
