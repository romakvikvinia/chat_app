import React, { useCallback, useEffect, useState } from "react";
import { MessageContainerStyle } from "../../../utils/styles";
import { MessageType, UserType } from "../../../api/types";

import { MessageItem } from "./MessageItem";
import {
  MessageMenuContext,
  MessageMenuDefaultValue,
} from "../../../utils/context/message.context";
import { MessageContextMenu } from "./MessageContextMenu";
import { useAppSelector } from "../../../package/store/hooks";

type Props = {
  messages: MessageType[];
};

export interface IMessageContainerState {
  message: MessageType | null;
  showContextMenu: boolean;
  position: { x: number; y: number };
}

export const MessageContainer: React.FC<Props> = ({ messages }) => {
  const user = useAppSelector((state) => state.chat_app.queries)[
    "getMe(undefined)"
  ] as { data: UserType };

  const [state, setState] = useState<IMessageContainerState>({
    message: null,
    showContextMenu: false,
    position: { x: 0, y: 0 },
  });

  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, message: MessageType) => {
      e.preventDefault();

      setState((prevState) => ({
        ...prevState,
        message,
        showContextMenu: true,
        position: {
          x: e.pageX,
          y: e.pageY,
        },
      }));
    },
    []
  );

  const handleOutsideClick = useCallback(() => {
    setState((prevState) => ({ ...prevState, showContextMenu: false }));
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <MessageMenuContext.Provider
      value={{
        ...MessageMenuDefaultValue,
        message: state.message,
        setMessage: setState,
      }}
    >
      <MessageContainerStyle>
        {messages.map((message, index, arr) => {
          if (arr.length - 1 === index)
            return (
              <MessageItem
                onContextMenu={(e) => handleContextMenu(e, message)}
                message={message}
                showAuthor
                key={`MessageItem-${message.id}`}
              />
            );
          if (message.author.id === arr[index + 1].author.id)
            return (
              <MessageItem
                onContextMenu={(e) => handleContextMenu(e, message)}
                message={message}
                showAuthor={false}
                key={`MessageItem-${message.id}`}
              />
            );
          else
            return (
              <MessageItem
                onContextMenu={(e) => handleContextMenu(e, message)}
                message={message}
                showAuthor
                key={`MessageItem-${message.id}`}
              />
            );
        })}
        {state.showContextMenu &&
          user &&
          user.data &&
          user.data.id &&
          user.data.id === state.message?.author.id && (
            <MessageContextMenu position={state.position} />
          )}
      </MessageContainerStyle>
    </MessageMenuContext.Provider>
  );
};
