import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";
import { useModalContext } from "../modalContext";
import { Paragraph, Title } from "components/ui/Typography/styled";
import Button from "components/Button";

type DialogModalProps = {
  type: "error" | "success" | "warning" | "default";
  message: string | ReactNode | ReactNode[];
  title?: string;
  optionTitle?: string;
  onConfirm?: () => void;
};

const DialogModal: FC<DialogModalProps> = ({
  type = "error",
  message,
  title,
  optionTitle,
  onConfirm,
}) => {
  const { handleModal } = useModalContext();

  const handleConfirm = () => {
    onConfirm?.();
    handleModal("");
  };

  return (
    <Styled.Wrapper onClick={() => handleModal("")}>
      <Styled.Container>
        <Styled.Content type={type}>
          <Styled.TextContainer>
            <Title color={type}>
              {title
                ? title
                : type[0].toLocaleUpperCase() + type.slice(1, type.length)}
            </Title>
            <Paragraph size="small">{message}</Paragraph>
            <Styled.ButtonContainer>
              {onConfirm && (
                <Button
                  onClick={handleConfirm}
                  size="small"
                  variant="anchor-dark"
                  padding="15px 0"
                >
                  {optionTitle || "Confirm"}
                </Button>
              )}
              <Button onClick={() => handleModal("")}>OK</Button>
            </Styled.ButtonContainer>
          </Styled.TextContainer>
        </Styled.Content>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default DialogModal;
