import React from "react";
import {
  MessageInput,
  MessageInputFieldContainerStyle,
} from "../../../utils/styles";

import styles from "./index.module.scss";

type Props = {
  message: string;
  onMessage: (message: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const MessageInputField: React.FC<Props> = ({
  message,
  onMessage,
  onSubmit,
}) => {
  return (
    <>
      <MessageInputFieldContainerStyle>
        <form onSubmit={onSubmit} className={styles.form}>
          <MessageInput
            value={message}
            onChange={(e) => onMessage(e.target.value)}
          />
        </form>
      </MessageInputFieldContainerStyle>
      <div>is Typing...</div>
    </>
  );
};
