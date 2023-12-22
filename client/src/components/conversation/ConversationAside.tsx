import React from "react";
import { TbEdit } from "react-icons/tb";
import { ConversationSideBarStyle } from "../../utils/styles";

export const ConversationAside = () => {
  return (
    <ConversationSideBarStyle>
      <header>
        <h1>ConversationAside</h1>
        <TbEdit size={40} />
      </header>
    </ConversationSideBarStyle>
  );
};
