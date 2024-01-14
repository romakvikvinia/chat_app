import React from "react";
import { MessageContainerStyle } from "../../../utils/styles";
import { MessageType } from "../../../api/types";

import { MessageItem } from "./MessageItem";

type Props = {
  messages: MessageType[];
};

export const MessageContainer: React.FC<Props> = ({ messages }) => {
  return (
    <MessageContainerStyle>
      {messages.map((message, index, arr) => {
        if (arr.length - 1 === index)
          return (
            <MessageItem
              message={message}
              showAuthor
              key={`MessageItem-${message.id}`}
            />
          );
        if (message.author.id === arr[index + 1].author.id)
          return (
            <MessageItem
              message={message}
              showAuthor={false}
              key={`MessageItem-${message.id}`}
            />
          );
        else
          return (
            <MessageItem
              message={message}
              showAuthor
              key={`MessageItem-${message.id}`}
            />
          );
      })}
    </MessageContainerStyle>
  );
};
