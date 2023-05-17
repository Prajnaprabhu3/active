import mongoose from "mongoose";
import env from "../utils/validateEnv";
import app from "../index";

export const connectDB = async () => {
  await mongoose.connect(env.MONGO_URI);
  console.log("database connected successfully");
  app.listen(env.PORT, () => {
    console.log(`server running on http://localhost:${env.PORT}`);
  });
};
