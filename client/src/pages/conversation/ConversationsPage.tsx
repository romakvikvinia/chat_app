import React from "react";
import { Page } from "../../utils/styles";
import { ConversationAside } from "../../components/conversation/ConversationAside";
import { Outlet } from "react-router-dom";
import { conversations } from "../../__mocks__/onversations";

export const ConversationsPage = () => {
  return (
    <Page>
      <ConversationAside conversations={conversations} />

      <Outlet />
    </Page>
  );
};
