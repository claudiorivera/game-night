import nextConnect from "next-connect";
import passport from "../util/passport";
import db from "./db";
import session from "./session";

const middleware = nextConnect();

middleware
  .use(db)
  .use(session)
  .use(passport.initialize())
  .use(passport.session());

export default middleware;
