import React from "react";
import { Page } from "../../utils/styles";
import { ConversationAside } from "../../components/conversation/ConversationAside";
import { Outlet, useParams } from "react-router-dom";

export const ConversationsPage = () => {
  const { id } = useParams();
  return (
    <Page>
      <ConversationAside />

      <Outlet />
    </Page>
  );
};
