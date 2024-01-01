import React, { PropsWithChildren } from "react";
import {
  ModalContainerStyle,
  ModalContentBodyStyle,
  ModalHeaderStyle,
} from "../../../utils/styles";

export const ModalHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return <ModalHeaderStyle>{children}</ModalHeaderStyle>;
};

export const ModalContentBody: React.FC<PropsWithChildren> = ({ children }) => {
  return <ModalContentBodyStyle>{children}</ModalContentBodyStyle>;
};

export const ModalContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <ModalContainerStyle>{children}</ModalContainerStyle>;
};
