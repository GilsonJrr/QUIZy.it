import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";
import { useModalContext } from "../modalContext";

type ModalTemplateProps = {
  children: ReactNode | ReactNode[];
  onClick?: () => void;
};

const ModalTemplate: FC<ModalTemplateProps> = ({ children, onClick }) => {
  const { handleModal } = useModalContext();

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClick ? onClick() : handleModal("");
  };

  return (
    <Styled.ModalBackground onClick={handleContainerClick}>
      <Styled.Container>{children}</Styled.Container>
    </Styled.ModalBackground>
  );
};

export default ModalTemplate;
