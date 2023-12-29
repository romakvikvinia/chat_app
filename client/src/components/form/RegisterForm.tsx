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
import { SignUpInput } from "../../api/types";
import { useSignUpMutation } from "../../api/chat.api";

export const RegisterForm = () => {
  const [signUp, { isLoading, isSuccess, isError }] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    defaultValues: { email: "", firstName: "", lastName: "", password: "" },
  });

  const onSubmit: SubmitHandler<SignUpInput> = (data) => signUp(data);
  console.log("isSuccess", isSuccess);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField
          id="email"
          {...register("email", { required: "Email is required" })}
        />
      </InputContainer>
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <InputField
            id="firstName"
            {...register("firstName", { required: "FirstName is required" })}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <InputField
            id="lastName"
            {...register("lastName", { required: "LastName is required" })}
          />
        </InputContainer>
      </section>
      <InputContainer>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
        />
      </InputContainer>
      <Button type="submit" className={styles.button}>
        Create My Account
      </Button>
      <div className={styles.footerText}>
        <span>Already Have an account ?</span>
        <Link to="/login">Login</Link>
      </div>
    </form>
  );
};
