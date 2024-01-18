import React from "react";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  TextField,
} from "../../../utils/styles";
import styles from "../index.module.scss";
import { useDispatch } from "react-redux";
import { addConversation } from "../../../package/store/slice/conversation.slice";

export const CreateConversationForm = () => {
  const dispatch = useDispatch();
  return (
    <form
      className={styles.createConversationForm}
      onSubmit={(e) => e.preventDefault()}
    >
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
      <Button
      // onClick={() => {
      //   dispatch(
      //     addConversation({
      //       id: 1,
      //       createdAt: new Date(),
      //       updatedAt: new Date(),
      //       creator: {
      //         id: 2,
      //         email: "romakvikvinia@gmail.com",
      //         firstName: "Roma",
      //         lastName: "KV",

      //         created_at: "2024-01-14T12:36:12.994Z",
      //         updated_at: "2024-01-14T12:36:46.835Z",
      //       },
      //       recipient: {
      //         id: 1,
      //         email: "nano@gmail.com",
      //         firstName: "Nano",
      //         lastName: "Kv",

      //         created_at: "2024-01-14T12:35:49.992Z",
      //         updated_at: "2024-01-14T12:36:02.843Z",
      //       },
      //       // messages: [],
      //     })
      //   );
      // }}
      >
        Create a conversation
      </Button>
    </form>
  );
};
