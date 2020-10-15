import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  database: process.env.MONGODB_URI,
  callbacks: {
    session: async (session, user) => {
      session.user = user;
      return Promise.resolve(session);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
