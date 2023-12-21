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

interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();

  const onSubmit: SubmitHandler<IRegister> = (data) => console.log(data);

  console.log(errors);

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
