import React from "react";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import {
  ConversationItemsWrapper,
  ConversationSideBarStyle,
  ConversationItem,
  ConversationSideBarHeader,
} from "../../utils/styles";
import { ConversationType } from "../../utils/types";

// css
import styles from "./index.module.scss";

type ConversationAsideProps = {
  conversations: ConversationType[];
};

export const ConversationAside: React.FC<ConversationAsideProps> = ({
  conversations,
}) => {
  const navigation = useNavigate();
  return (
    <ConversationSideBarStyle>
      <ConversationSideBarHeader>
        <h1>ConversationAside</h1>
        <TbEdit size={40} />
      </ConversationSideBarHeader>
      <ConversationItemsWrapper>
        {conversations.map((conversation) => (
          <ConversationItem
            key={`conversation-${conversation.id}`}
            onClick={() => navigation(`/conversations/${conversation.id}`)}
          >
            <div className={styles.conversationAvatar}></div>
            <div>
              <span className={styles.conversationName}>
                {conversation.name}
              </span>
              <span className={styles.conversationLastMessage}>
                {conversation.lastMessage}
              </span>
            </div>
          </ConversationItem>
        ))}
      </ConversationItemsWrapper>
    </ConversationSideBarStyle>
  );
};
