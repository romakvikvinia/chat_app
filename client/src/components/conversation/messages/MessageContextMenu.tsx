import React, { useCallback, useContext } from "react";
import { ContextMenuStyle } from "../../../utils/styles";
import { MessageMenuContext } from "../../../utils/context/message.context";
import { useDeleteMessageMutation } from "../../../api/chat.api";
import { useParams } from "react-router-dom";

type MessageContextMenuProps = {
  position: { x: number; y: number };
};

export const MessageContextMenu: React.FC<MessageContextMenuProps> = ({
  position,
}) => {
  const { id } = useParams();
  const { message } = useContext(MessageMenuContext);
  const [deleteMessage, { isLoading, isSuccess }] = useDeleteMessageMutation();

  const handleDelete = useCallback(() => {
    if (!message || !id) return;
    deleteMessage({ messageId: message.id, conversationId: parseInt(id) });
  }, [id, message, deleteMessage]);

  return (
    <ContextMenuStyle top={position.y} left={position.x}>
      <ul>
        <li>Edit</li>
        <li onClick={handleDelete}>Delete</li>
      </ul>
    </ContextMenuStyle>
  );
};
