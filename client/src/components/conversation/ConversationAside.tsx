import React, { useCallback, useState } from "react";
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
import { CreateConversationModal } from "./modals/CreateConversationModal";

type ConversationAsideProps = {
  conversations: ConversationType[];
};

export const ConversationAside: React.FC<ConversationAsideProps> = ({
  conversations,
}) => {
  const navigation = useNavigate();
  const [state, setState] = useState({ isOpen: false });

  const handleOpenModal = useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: true }));
  }, []);
  const handleCloseModal = useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: false }));
  }, []);
  return (
    <>
      {state.isOpen && <CreateConversationModal close={handleCloseModal} />}

      <ConversationSideBarStyle>
        <ConversationSideBarHeader>
          <h1>ConversationAside</h1>
          <div onClick={handleOpenModal}>
            <TbEdit size={40} />
          </div>
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
    </>
  );
};
