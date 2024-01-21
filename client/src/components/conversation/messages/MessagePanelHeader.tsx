import React from "react";
import { MessagePanelHeaderStyle } from "../../../utils/styles";
import { useGetMeQuery } from "../../../api/chat.api";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ConversationType } from "../../../api/types";

export const MessagePanelHeader = () => {
  const { data } = useGetMeQuery();
  const { id } = useParams();

  const conversations =
    useSelector<any, ConversationType[]>(
      (state: any) =>
        state["chat_app"].queries["conversations(undefined)"] &&
        state["chat_app"].queries["conversations(undefined)"].data
    ) || [];

  const conversation = conversations.find((c) => c.id === parseInt(id!));

  const displayName =
    conversation && data && data.id === conversation.creator.id
      ? `${conversation.recipient.firstName} ${conversation.recipient.lastName}`
      : conversation && conversation.creator
      ? `${conversation.creator.firstName} ${conversation.creator.lastName}`
      : "";

  return <MessagePanelHeaderStyle>{displayName}</MessagePanelHeaderStyle>;
};
