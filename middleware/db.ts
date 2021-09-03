import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import dbConnect from "util/dbConnect";

const db = async (
  _req: NextApiRequest,
  _res: NextApiResponse,
  next: NextHandler
) => {
  // https://mongoosejs.com/docs/api.html#connection_Connection-readyState
  if (mongoose.connections[0].readyState !== 1) {
    await dbConnect();
  }
  return next();
};
export default db;
