import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";

type ModalTemplateProps = {
  children: ReactNode | ReactNode[];
  onClick: () => void;
};

const ModalTemplate: FC<ModalTemplateProps> = ({ children, onClick }) => {
  return (
    <Styled.ModalBackground onClick={onClick}>
      {children}
    </Styled.ModalBackground>
  );
};

export default ModalTemplate;
