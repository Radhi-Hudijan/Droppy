import express from "express";
import { createJob, getJobs } from "../controllers/job.js";

const jobRouter = express.Router();

jobRouter.get("/", getJobs);

jobRouter.post("/create", createJob);

export default jobRouter;
