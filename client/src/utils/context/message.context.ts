import { Dispatch, SetStateAction, createContext } from "react";
import { MessageType } from "../../api/types";
import { IMessageContainerState } from "../../components/conversation/messages/MessageContainer";

type MessageMenuContextValueType = {
  message: MessageType | null;
  setMessage: Dispatch<SetStateAction<IMessageContainerState>>;
};

export const MessageMenuDefaultValue: MessageMenuContextValueType = {
  message: null,
  setMessage: () => {},
};

export const MessageMenuContext = createContext<MessageMenuContextValueType>(
  MessageMenuDefaultValue
);
