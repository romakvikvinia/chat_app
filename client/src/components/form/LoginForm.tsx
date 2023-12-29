import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from "../../utils/styles";
// styles
import styles from "./index.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSignInMutation } from "../../api/chat.api";
import { SignInInput } from "../../api/types";

export const LoginForm = () => {
  const navigation = useNavigate();
  const [signIn, { isLoading, isSuccess, isError }] = useSignInMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>();

  const onSubmit: SubmitHandler<SignInInput> = (data) => signIn(data);

  if (isSuccess) {
    navigation("/conversations");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="email" aria-autocomplete="none">
          Email
        </InputLabel>
        <InputField
          id="email"
          {...register("email", { required: "Email is required" })}
        />
      </InputContainer>

      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor="password" aria-autocomplete="none">
          Password
        </InputLabel>
        <InputField
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
        />
      </InputContainer>
      <Button type="submit">Login</Button>
      <div className={styles.footerText}>
        <span> Don't have an account ?</span>
        <Link to="/register">Sign up</Link>
      </div>
    </form>
  );
};
