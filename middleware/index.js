import nextConnect from "next-connect";
import db from "./db";

const middleware = nextConnect();

middleware.use(db);

export default middleware;
