import { LoginForm } from "components";
import { GetServerSideProps } from "next";
import { getProviders } from "next-auth/react";
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
      providers: await getProviders(),
    },
  };
};
