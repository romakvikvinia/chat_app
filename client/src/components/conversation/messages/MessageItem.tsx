import React, { useCallback } from "react";
import { formatRelative } from "date-fns";
import { MessageType } from "../../../api/types";
import {
  MessageItemContainer,
  MessageItemAvatar,
  MessageItemDetails,
  MessageItemHeader,
  MessageItemContent,
} from "../../../utils/styles";

type MessageItemProps = {
  showAuthor: boolean;
  message: MessageType;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  showAuthor,
  onContextMenu,
}) => {
  return (
    <MessageItemContainer
      key={`conversation-message-${message.id}`}
      onContextMenu={onContextMenu}
    >
      {showAuthor && <MessageItemAvatar />}
      <MessageItemDetails>
        {showAuthor && (
          <MessageItemHeader>
            <span className="authorName">
              {message.author.firstName} {message.author.lastName}
            </span>
            <span className="time">
              {formatRelative(new Date(message.createdAt), new Date())}
            </span>
          </MessageItemHeader>
        )}

        <MessageItemContent padding={!showAuthor ? "0 0 0 70px" : "0"}>
          {message.content}
        </MessageItemContent>
      </MessageItemDetails>
    </MessageItemContainer>
  );
};
