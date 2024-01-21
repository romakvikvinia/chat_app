import React, { useCallback, useEffect } from "react";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  TextField,
} from "../../../utils/styles";
import styles from "../index.module.scss";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { CreateConversationArgsType } from "../../../api/types";
import {
  chatAppApi,
  useCreateConversationMutation,
} from "../../../api/chat.api";
import { AppDispatch } from "../../../package/store";

type CreateConversationFormProps = {
  handleClose: () => void;
};

export const CreateConversationForm: React.FC<CreateConversationFormProps> = ({
  handleClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateConversationArgsType>({});

  const dispatch = useDispatch<AppDispatch>();

  const [createConversation, { data, isLoading, isSuccess }] =
    useCreateConversationMutation();

  const onSubmit = useCallback(
    (data: CreateConversationArgsType) => {
      createConversation(data);
    },
    [createConversation]
  );

  useEffect(() => {
    if (isSuccess && !isLoading) {
      dispatch(
        chatAppApi.util.updateQueryData(
          "conversations",
          undefined,
          (conversationsData) => {
            if (data) conversationsData.unshift(data);
          }
        )
      );
      handleClose();
    }
  }, [data, isLoading, isSuccess, dispatch, handleClose]);

  return (
    <form
      className={styles.createConversationForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <section>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Recipient</InputLabel>
          <InputField {...register("email", { required: true })} />
        </InputContainer>
      </section>
      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Message (Optional)</InputLabel>
          <TextField {...register("message", { required: true })} />
        </InputContainer>
      </section>
      <Button>Create a conversation</Button>
    </form>
  );
};
