import styled, { css } from "styled-components";
import {
  ContextMenuProps,
  InputContainerProps,
  MessageItemContainerProps,
  PageProps,
} from "./style.types";

export const DARK = "#131313";
export const SIDEBAR_WITH = 400;

export const InputField = styled.input`
  font-family: "Inter";
  background: inherit;
  outline: none;
  border: none;
  color: #fff;
  font-size: 18px;
  box-sizing: border-box;
  width: 100%;
  padding: 0;
  margin: 4px 0;
`;

export const InputContainer = styled.div<InputContainerProps>`
  background-color: ${({ backgroundColor }) => backgroundColor || "#131313"};
  color: #fff;
  padding: 12px 16px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
`;

export const InputLabel = styled.label`
  display: block;
  color: #8f8f8f;
  font-size: 14px;
  margin: 4px 0;
`;

export const Button = styled.button`
  width: 100%;
  color: #fff;
  background: #2b09ff;
  font-family: "Inter";
  outline: none;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  padding: 25px 0;
  font-weight: bold;
  transition: 250ms background ease;
  transition: 500ms border ease;
  border: 2px solid #2b09ff;
  box-sizing: border-box;
  &:focus {
    background: #3415ff;
    border: 2px solid #fff;
  }
  &:hover {
    cursor: pointer;
    background: #3415ff;
  }
  &:hover {
    background: #3a1cff;
  }
`;

export const Page = styled.div<PageProps>`
  height: 100%;
  background-color: #1a1a1a;
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

export const ConversationSideBarStyle = styled.aside`
  height: 100%;
  width: ${SIDEBAR_WITH}px;
  background-color: #282828;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
    // with: 10px;
    // height: 5px;
  }
  // &::-webkit-scrollbar-thumb {
  //   background-color: #2d2d2d;
  // }
`;

export const ConversationSideBarHeader = styled.header`
  width: ${SIDEBAR_WITH}px;
  box-sizing: border-box;
  background-color: #151515;
  height: 80px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
  border-bottom: 1px solid #545454;
`;

export const ConversationChanelPageStyle = styled.div`
  height: 100%;
  margin-left: ${SIDEBAR_WITH}px;
`;
export const ConversationPanelStyle = styled.div`
  height: 100%;
  margin-left: ${SIDEBAR_WITH}px;
  border-left: 1px solid #545454;
`;
export const ConversationItemsWrapper = styled.div``;

export const ConversationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px 32px;
  border-left: 1px solid #545454;
  background-color: #131313;
  margin: 2px 0;
`;

export const OverlayStyle = styled.div`
  width: 100%;
  height: 100%;
  background: #000000c2;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainerStyle = styled.div`
  background: #121212;
  width: 650px;
  border-radius: 10px;
`;

export const ModalHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 18px;
  margin-top: 16px;
  & h2 {
    font-weight: 500;
  }
`;

export const ModalContentBodyStyle = styled.div`
  padding: 24px;
`;

export const TextField = styled.textarea`
  font-family: "Inter";
  background: inherit;
  outline: none;
  border: none;
  color: #fff;
  font-size: 18px;
  box-sizing: border-box;
  width: 100%;
  padding: 0;
  margin: 4px 0;
  resize: none;
`;

export const MessagePanelStyle = styled.div`
  background: inherit;
  height: 100%;
`;

export const MessagePanelBodyStyle = styled.div`
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 20px 20px 20px;
`;

export const MessageContainerStyle = styled.div`
  height: 100%;
  padding: 10px 0;
  // border: 1px solid #fff;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
`;

export const MessageInputFieldContainerStyle = styled.div`
  box-sizing: border-box;
  background: #101010;
  border-radius: 5px;
`;

export const MessageInput = styled.input`
  background: inherit;
  box-sizing: border-box;
  border: none;
  outline: none;
  padding: 24px 32px;
  color: #a3a3a3;
  font-family: "Inter";
  font-size: 18px;
  resize: none;
  width: 100%;
`;

export const MessageItemContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 5px 0;
`;

export const MessageItemAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
`;

export const MessageItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .authorName {
    font-weight: 600;
    font-size: 18px;
  }
  .time {
    color: #6d6d6d;
    font-size: 12px;
    font-weight: bold;
  }
`;

export const MessageItemDetails = styled.div`
  flex-grow: 1;
`;

export const MessageItemContent = styled.div<MessageItemContainerProps>`
  padding: ${(props) => props.padding};
  word-break: break-all;
`;

export const MessagePanelHeaderStyle = styled.header`
  background: #151515;
  border-left: 1px solid #5454543d;

  box-sizing: border-box;
  background-color: #151515;
  height: 80px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
  border-bottom: 1px solid #545454;
`;

export const ContextMenuStyle = styled.div<ContextMenuProps>`
  border-radius: 4px;
  box-sizing: border-box;
  position: fixed;
  width: 200px;
  background-color: #252525;
  ${(props) => css`
    top: ${props.top}px;
    left: ${props.left}px;
  `}

  ul {
    list-style: none;
    margin: 0;
    padding: 10px;
  }

  ul li {
    padding: 12px 16px;
    border-radius: 10px;
  }
  ul li:hover {
    cursor: pointer;
    background-color: #1f1f1f;
  }
`;
