import React from "react";
import { Page } from "../../utils/styles";
import { ConversationAside } from "../../components/conversation/ConversationAside";
import { Outlet } from "react-router-dom";

export const ConversationsPage = () => {
  return (
    <Page>
      <ConversationAside conversations={[]} />

      <Outlet />
    </Page>
  );
};
