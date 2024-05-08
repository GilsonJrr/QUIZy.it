import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";
import { Outlet } from "react-router-dom";
import LoginImage from "assets/images/Login_Image.jpg";

type AuthPagesProps = {
  children?: ReactNode | ReactNode[];
};

const AuthPages: FC<AuthPagesProps> = ({ children }) => {
  return (
    <Styled.Container>
      <Styled.FormContainer>{children || <Outlet />}</Styled.FormContainer>
      <Styled.ImageContainer src={LoginImage} />
    </Styled.Container>
  );
};

export default AuthPages;
