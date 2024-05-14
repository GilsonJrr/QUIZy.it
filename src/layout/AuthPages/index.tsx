import React, { FC, ReactNode } from "react";
import * as Styled from "./styled";
import { Outlet } from "react-router-dom";
import LoginImage from "assets/images/Login_Image.jpg";
import useDeviceType from "hooks/useDeviceType";

type AuthPagesProps = {
  children?: ReactNode | ReactNode[];
};

const AuthPages: FC<AuthPagesProps> = ({ children }) => {
  const isMobile = useDeviceType();

  return (
    <Styled.Container>
      <Styled.FormContainer>{children || <Outlet />}</Styled.FormContainer>
      {!isMobile && <Styled.ImageContainer src={LoginImage} />}
    </Styled.Container>
  );
};

export default AuthPages;
