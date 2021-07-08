import LoginForm from "@components/LoginForm";
import { providers } from "next-auth/client";
import React from "react";

const AuthLoginPage = ({ providers }) => <LoginForm providers={providers} />;

export default AuthLoginPage;

export const getServerSideProps = async (context) => {
  return {
    props: {
      providers: await providers(context),
    },
  };
};
