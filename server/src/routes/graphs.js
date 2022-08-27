import express from "express";
import { countJobs } from "../controllers/graphs.js";

const jobRouter = express.Router();

jobRouter.get("/values", countJobs);

export default jobRouter;
