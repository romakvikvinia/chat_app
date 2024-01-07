import React from "react";
import { Page } from "../../utils/styles";
import { ConversationAside } from "../../components/conversation/ConversationAside";
import { Outlet } from "react-router-dom";
import { useConversationsQuery } from "../../api/chat.api";

export const ConversationsPage = () => {
  const { data, isLoading } = useConversationsQuery();

  return (
    <Page>
      <ConversationAside conversations={data || []} />

      <Outlet />
    </Page>
  );
};
