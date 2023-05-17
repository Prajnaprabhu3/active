import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db";

const app = express();

app.get("/", (req, res) => {
  res.send("home route running successfully");
});

connectDB();

export default app;
