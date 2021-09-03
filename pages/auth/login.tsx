import { LoginForm } from "components";
import { GetServerSideProps } from "next";
import { getProviders, providers } from "next-auth/client";
import React from "react";

interface Props {
  providers: typeof getProviders;
}

const AuthLoginPage = ({ providers }: Props) => (
  <LoginForm providers={providers} />
);

export default AuthLoginPage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      providers: await providers(),
    },
  };
};
