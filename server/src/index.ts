import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
const router = express.Router();

import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db";

import notes from "./routes/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

connectDB();

//defining routes
app.use("/api/notes/", notes);

// for end-points that does not exist
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occured";
  let status = 500;

  if (isHttpError(error)) {
    status = error.status;
    errorMessage = error.message;
  }

  res.json({ error: errorMessage }).status(status);
});

export default app;
