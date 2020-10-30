import LoginForm from "@components/LoginForm";
import { Container } from "@material-ui/core";
import { providers } from "next-auth/client";
import React from "react";

const AuthLoginPage = ({ providers }) => (
  <Container>
    <LoginForm providers={providers} />
  </Container>
);

export default AuthLoginPage;

export const getServerSideProps = async (context) => {
  return {
    props: {
      providers: await providers(context),
    },
  };
};
