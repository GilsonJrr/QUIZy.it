import React, { FC, ReactNode, useEffect } from "react";
import * as Styled from "./styled";
import { useModalContext } from "../modalContext";
import { Title } from "components/ui/Typography/styled";

type AlertModalProps = {
  type: "error" | "success" | "warning" | "default";
  message: string | ReactNode | ReactNode[];
  title?: string;
  totalTime?: number;
};

const AlertModal: FC<AlertModalProps> = ({
  type = "error",
  message,
  title,
  totalTime,
}) => {
  const { handleModal } = useModalContext();

  useEffect(() => {
    setTimeout(
      () => {
        handleModal("");
      },
      totalTime ? totalTime : 3000
    );
  });

  return (
    <Styled.Container>
      <Styled.Content type={type}>
        <Styled.IconContainer>
          {type === "error" && <Styled.ErrorIcon size={40} />}
          {type === "success" && <Styled.SuccessIcon size={40} />}
          {type === "warning" && <Styled.WarningIcon size={40} />}
          {type === "default" && <Styled.InfoIcon size={40} />}
        </Styled.IconContainer>
        <Styled.TextContainer>
          <Title color={type}>
            {title
              ? title
              : type === "default"
              ? "Info"
              : type[0].toLocaleUpperCase() + type.slice(1, type.length)}
          </Title>
          <Title size="small" textAlign="left" multiLine fontWeight="lighter">
            {message}
          </Title>
        </Styled.TextContainer>
        <Styled.CloseContainer>
          <Styled.CloseIcon size={20} onClick={() => handleModal("")} />
        </Styled.CloseContainer>
      </Styled.Content>
    </Styled.Container>
  );
};

export default AlertModal;
