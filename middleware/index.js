import nextConnect from "next-connect";
// import passport from "../util/passport";
import db from "./db";

const middleware = nextConnect();

middleware.use(db);
// .use(passport.initialize())
// .use(passport.session())

export default middleware;
