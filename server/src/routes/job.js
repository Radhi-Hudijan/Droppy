import express from "express";
import {
  createJob,
  deleteJob,
  updateJob,
  getActiveJobs,
  getAllJobs,
  getOneJob,
  acceptCancelJob,
} from "../controllers/job.js";

const jobRouter = express.Router();

jobRouter.get("/", getAllJobs);

jobRouter.post("/", getActiveJobs);

jobRouter.get("/:id", getOneJob);

jobRouter.delete("/:id", deleteJob);

jobRouter.patch("/:id", updateJob);

jobRouter.put("/:id", acceptCancelJob);

jobRouter.post("/create", createJob);

export default jobRouter;
