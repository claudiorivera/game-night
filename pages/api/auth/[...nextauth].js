import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import nextConnect from "next-connect";
import middleware from "../../../middleware";

const handler = nextConnect();

handler.use(middleware);

handler.use((req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.Facebook({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Providers.Email({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
    ],
    database: process.env.MONGODB_URI,
    secret: process.env.SECRET,
    pages: {
      signIn: "/auth/login",
      error: "/auth/error",
      verifyRequest: "/auth/verifyrequest",
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    session: {
      jwt: true,
    },
    callbacks: {
      signIn: async (user, account, profile) => {
        const isAllowedToSignIn = true;
        if (isAllowedToSignIn) {
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      },
      jwt: async (token, user) => {
        if (user) {
          token.uid = user.id;
          token.emailVerified = user.emailVerified;
        }
        return Promise.resolve(token);
      },
      session: async (session, token) => {
        session.user.id = token.uid;
        session.user.emailVerified = token.emailVerified;
        return Promise.resolve(session);
      },
    },
  })
);

export default handler;
