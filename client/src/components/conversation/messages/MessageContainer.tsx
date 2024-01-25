import React, { useCallback, useEffect, useState } from "react";
import { ContextMenuStyle, MessageContainerStyle } from "../../../utils/styles";
import { MessageType } from "../../../api/types";

import { MessageItem } from "./MessageItem";

type Props = {
  messages: MessageType[];
};

interface IMessageContainerState {
  showContextMenu: boolean;
  position: { x: number; y: number };
}

export const MessageContainer: React.FC<Props> = ({ messages }) => {
  const [state, setState] = useState<IMessageContainerState>({
    showContextMenu: false,
    position: { x: 0, y: 0 },
  });

  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();

      setState((prevState) => ({
        ...prevState,
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
    <MessageContainerStyle>
      {messages.map((message, index, arr) => {
        if (arr.length - 1 === index)
          return (
            <MessageItem
              onContextMenu={handleContextMenu}
              message={message}
              showAuthor
              key={`MessageItem-${message.id}`}
            />
          );
        if (message.author.id === arr[index + 1].author.id)
          return (
            <MessageItem
              onContextMenu={handleContextMenu}
              message={message}
              showAuthor={false}
              key={`MessageItem-${message.id}`}
            />
          );
        else
          return (
            <MessageItem
              onContextMenu={handleContextMenu}
              message={message}
              showAuthor
              key={`MessageItem-${message.id}`}
            />
          );
      })}
      {state.showContextMenu && (
        <ContextMenuStyle top={state.position.y} left={state.position.x}>
          <ul>
            <li>Edit</li>
            <li>Delete</li>
          </ul>
        </ContextMenuStyle>
      )}
    </MessageContainerStyle>
  );
};
