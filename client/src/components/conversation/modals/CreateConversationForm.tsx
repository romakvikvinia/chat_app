import React from "react";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  TextField,
} from "../../../utils/styles";
import styles from "../index.module.scss";

export const CreateConversationForm = () => {
  return (
    <form className={styles.createConversationForm}>
      <section>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Recipient</InputLabel>
          <InputField />
        </InputContainer>
      </section>
      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Message (Optional)</InputLabel>
          <TextField />
        </InputContainer>
      </section>
      <Button>Create a conversation</Button>
    </form>
  );
};
