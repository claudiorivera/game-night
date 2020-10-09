import dbConnect from "../util/dbConnect";
import mongoose from "mongoose";

const db = async (req, res, next) => {
  if (mongoose.connections[0].readyState !== 1) {
    await dbConnect();
  }
  return next();
};
export default db;
