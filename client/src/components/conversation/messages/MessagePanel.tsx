import React from "react";
import {
  MessagePanelBodyStyle,
  MessagePanelStyle,
} from "../../../utils/styles";
import { MessageContainer } from "./MessageContainer";
import { MessageInputField } from "./MessageInputField";
import { MessageType } from "../../../api/types";
import { MessagePanelHeader } from "./MessagePanelHeader";

type Props = {
  messages: MessageType[];
};

export const MessagePanel: React.FC<Props> = ({ messages }) => {
  return (
    <MessagePanelStyle>
      <MessagePanelHeader />
      <MessagePanelBodyStyle>
        <MessageContainer messages={messages} />
        <MessageInputField />
      </MessagePanelBodyStyle>
    </MessagePanelStyle>
  );
};
