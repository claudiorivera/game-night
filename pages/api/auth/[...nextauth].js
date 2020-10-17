import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import nextConnect from "next-connect";
import middleware from "../../../middleware";

const handler = nextConnect();

handler.use(middleware);

handler.use((req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Providers.Facebook({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
    ],
    database: process.env.MONGODB_URI,
    secret: process.env.SECRET,
    pages: {
      signIn: "/auth/login",
      error: "/auth/error", // Error code passed in query string as ?error=
      verifyRequest: "/auth/verifyrequest", // (used for check email message)
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    session: {
      jwt: true,
    },
    callbacks: {
      jwt: async (token, user) => {
        if (user) {
          token.uid = user.id;
        }
        return Promise.resolve(token);
      },
      session: async (session, token) => {
        session.user.id = token.uid;
        return Promise.resolve(session);
      },
    },
  })
);

export default handler;
