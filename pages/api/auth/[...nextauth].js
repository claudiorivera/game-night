import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  // https://github.com/nextauthjs/next-auth/issues/366#issuecomment-651959649
  database: process.env.MONGODB_URI + "?entityPrefix=nextauth_",
  site: process.env.SITE || "http://localhost:3000",
  session: {
    jwt: true,
  },
  callbacks: {
    async session(session, token) {
      // expose user id
      return Promise.resolve({
        ...session,
        user: { ...session.user, id: token.user.id },
      });
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
