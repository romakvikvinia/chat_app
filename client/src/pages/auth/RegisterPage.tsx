import React from "react";
import { Page } from "../../utils/styles";
import { RegisterForm } from "../../components/form/RegisterForm";

export const RegisterPage = () => {
  return (
    <Page display="flex" alignItems="center" justifyContent="center">
      <RegisterForm />
    </Page>
  );
};
