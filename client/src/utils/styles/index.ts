import styled from "styled-components";
import { PageProps } from "./style.types";

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
  margin: 4px; 0;
`;

export const InputContainer = styled.div`
  background-color: #131313;
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
  margin: 4px; 0;
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
  position: fixed;
  left: 0;
  top: 0;
  width: ${SIDEBAR_WITH}px;
  box-sizing: border-box;
  background-color: #151515;
  height: 80px;
  font-wight: bold;
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
export const ConversationItemsWrapper = styled.div`
  margin-top: 80px;
`;

export const ConversationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px 32px;
  border-left: 1px solid #545454;
  background-color: #131313;
  margin: 2px 0;
`;
