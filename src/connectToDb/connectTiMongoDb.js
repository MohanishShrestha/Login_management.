import mongoose from "mongoose";
import { dburl } from "../constant.js";

const connectToMongoDb = async () => {
  await mongoose.connect(dburl);
  console.log("application is connected to mongodb successfully");
};

export default connectToMongoDb;
