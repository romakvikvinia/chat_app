import React, { useCallback } from "react";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from "../../utils/styles";
// styles
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputContainer>
        <InputLabel htmlFor="email" aria-autocomplete="none">
          Email
        </InputLabel>
        <InputField id="email" />
      </InputContainer>

      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor="password" aria-autocomplete="none">
          Password
        </InputLabel>
        <InputField type="password" id="password" />
      </InputContainer>
      <Button type="submit">Login</Button>
      <div className={styles.footerText}>
        <span> Don't have an account ?</span>
        <Link to="/register">Sign up</Link>
      </div>
    </form>
  );
};
