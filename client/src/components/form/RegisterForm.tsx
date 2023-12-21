import React from "react";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from "../../utils/styles";
// styles
import styes from "./index.module.scss";

export const RegisterForm = () => {
  return (
    <form className={styes.form}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField id="email" />
      </InputContainer>
      <section className={styes.nameFieldRow}>
        <InputContainer>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <InputField id="firstName" />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <InputField id="lastName" />
        </InputContainer>
      </section>
      <InputContainer>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField type="password" id="password" />
      </InputContainer>
      <Button type="submit" className={styes.button}>
        Create My Account
      </Button>
    </form>
  );
};
