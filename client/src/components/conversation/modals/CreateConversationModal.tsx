import React, { Dispatch, useCallback, useEffect } from "react";
import { OverlayStyle } from "../../../utils/styles";
import { CreateConversationForm } from "./CreateConversationForm";
import { ModalContainer, ModalContentBody, ModalHeader } from ".";
import { MdClose } from "react-icons/md";

type CreateConversationModalProps = {
  close: Dispatch<React.SetStateAction<void>>;
};

export const CreateConversationModal: React.FC<
  CreateConversationModalProps
> = ({ close }) => {
  const ref = React.createRef<HTMLDivElement>();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close]);

  const handleOverlyClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (ref.current && ref.current === e.target) {
        close();
      }
    },
    [close, ref]
  );
  return (
    <OverlayStyle ref={ref} onClick={handleOverlyClick}>
      <ModalContainer>
        <ModalHeader>
          <h2>Create a conversation</h2>
          <MdClose size={24} color="red" onClick={() => close()} />
        </ModalHeader>
        <ModalContentBody>
          <CreateConversationForm />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
};
