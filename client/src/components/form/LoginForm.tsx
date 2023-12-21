import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from "../../utils/styles";
// styles
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

interface ILogin {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit: SubmitHandler<ILogin> = (data) => console.log(data);

  console.log(errors);

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
