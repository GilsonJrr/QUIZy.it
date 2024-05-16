import React, { FC, ReactNode, useEffect } from "react";
import * as Styled from "./styled";
import { useModalContext } from "../modalContext";

type AlertModalProps = {
  type: "error" | "success" | "warning" | "info";
  message: string | ReactNode | ReactNode[];
  title?: string;
};

const AlertModal: FC<AlertModalProps> = ({
  type = "error",
  message,
  title,
}) => {
  const { handleModal } = useModalContext();

  useEffect(() => {
    setTimeout(() => {
      handleModal("");
    }, 4000);
  });

  return (
    <Styled.Container>
      <Styled.Content type={type}>
        <Styled.IconContainer>
          {type === "error" && <Styled.ErrorIcon size={40} />}
          {type === "success" && <Styled.SuccessIcon size={40} />}
          {type === "warning" && <Styled.WarningIcon size={40} />}
          {type === "info" && <Styled.InfoIcon size={40} />}
        </Styled.IconContainer>
        <Styled.TextContainer>
          <Styled.Title type={type}>
            {title
              ? title
              : type[0].toLocaleUpperCase() + type.slice(1, type.length)}
          </Styled.Title>
          <Styled.Message>{message}</Styled.Message>
        </Styled.TextContainer>
        <Styled.CloseContainer>
          <Styled.CloseIcon size={20} onClick={() => handleModal("")} />
        </Styled.CloseContainer>
      </Styled.Content>
    </Styled.Container>
  );
};

export default AlertModal;
