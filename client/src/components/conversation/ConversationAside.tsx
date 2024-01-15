import React, { useCallback, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import {
  ConversationItemsWrapper,
  ConversationSideBarStyle,
  ConversationItem,
  ConversationSideBarHeader,
} from "../../utils/styles";

// css
import styles from "./index.module.scss";
import { CreateConversationModal } from "./modals/CreateConversationModal";
import { ConversationType } from "../../api/types";
import { useGetMeQuery, useConversationsQuery } from "../../api/chat.api";

type ConversationAsideProps = {};

export const ConversationAside: React.FC<ConversationAsideProps> = ({}) => {
  const navigation = useNavigate();
  const { data } = useGetMeQuery();
  const { data: conversations, isLoading } = useConversationsQuery();
  const [state, setState] = useState({ isOpen: false });

  const handleOpenModal = useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: true }));
  }, []);
  const handleCloseModal = useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: false }));
  }, []);

  const getDisplayUser = (conversation: ConversationType) =>
    data && data.id === conversation.creator.id
      ? conversation.recipient
      : conversation.creator;

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
          {conversations &&
            Array.from(conversations, ([_, conversation]) => conversation).map(
              (conversation) => (
                <ConversationItem
                  key={`conversation-${conversation.id}`}
                  onClick={() =>
                    navigation(`/conversations/${conversation.id}`)
                  }
                >
                  <div className={styles.conversationAvatar}></div>
                  <div>
                    <span className={styles.conversationName}>
                      {`${getDisplayUser(conversation).firstName} ${
                        getDisplayUser(conversation).lastName
                      }`}
                    </span>
                    <span className={styles.conversationLastMessage}>
                      simple Text
                    </span>
                  </div>
                </ConversationItem>
              )
            )}
        </ConversationItemsWrapper>
      </ConversationSideBarStyle>
    </>
  );
};
