import express from "express";
import { createJob, getActiveJobs, getAllJobs } from "../controllers/job.js";

const jobRouter = express.Router();

jobRouter.get("/", getAllJobs);

jobRouter.post("/", getActiveJobs);

jobRouter.post("/create", createJob);

export default jobRouter;
