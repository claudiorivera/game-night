import middleware from "middleware";
import { UserModel } from "models";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import nextConnect from "next-connect";
import randomlyGeneratedName from "util/randomlyGeneratedName";
import sendVerificationRequest from "util/sendVerificationRequest";

const handler = nextConnect();

handler.use(middleware);

handler.use((req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Providers.Email({
        server: process.env.EMAIL_SERVER,
        from: process.env.NEXT_PUBLIC_EMAIL_FROM,
        sendVerificationRequest,
      }),
    ],
    database: process.env.MONGODB_URI,
    secret: process.env.SECRET,
    pages: {
      signIn: "/auth/login",
      error: "/auth/error",
      verifyRequest: "/auth/verifyrequest",
    },
    session: {
      jwt: true,
    },
    callbacks: {
      jwt: async (token, user, _account, _profile, isNewUser) => {
        if (user && isNewUser) {
          try {
            const randomImage = `https://picsum.photos/seed/${user.id}/180`;
            const userToUpdate = await UserModel.findByIdAndUpdate(
              user.id,
              {
                name: user.name || randomlyGeneratedName(),
                image: user.image || randomImage,
              },
              { new: true }
            ).exec();

            await userToUpdate.save();
          } catch (error) {
            console.error(error);
          }
        }
        if (user) {
          token.uid = user.id;
          try {
            const userFound = await UserModel.findById(user.id);
            token.isAdmin = userFound?.isAdmin;
          } catch (error: any) {
            console.error(error);
          }
        }
        return Promise.resolve(token);
      },
      session: async (session, token) => {
        session.user.id = token.uid as string;
        session.user.isAdmin = token.isAdmin as boolean;
        return Promise.resolve(session);
      },
    },
  })
);

export default handler;
