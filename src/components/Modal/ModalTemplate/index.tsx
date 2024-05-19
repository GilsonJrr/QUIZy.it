import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";

type ModalTemplateProps = {
  children: ReactNode | ReactNode[];
  onClick: () => void;
};

const ModalTemplate: FC<ModalTemplateProps> = ({ children, onClick }) => {
  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <Styled.ModalBackground onClick={handleContainerClick}>
      <Styled.Container>{children}</Styled.Container>
    </Styled.ModalBackground>
  );
};

export default ModalTemplate;
