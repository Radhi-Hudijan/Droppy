import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import authRouter from "./routes/authentication.js";
import jobRouter from "./routes/job.js";
import graphsRouter from "./routes/graphs.js";
// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/user", userRouter);
app.use("/api/authentication", authRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/graphs", graphsRouter);

export default app;
