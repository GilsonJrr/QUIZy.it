import React, { FC } from "react";
import * as Styled from "./styled";

import Logo from "assets/images/Logo.png";

//Icons
import { IoMdHome } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
// import { FaFlag } from "react-icons/fa";

import { IoMdExit } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

type SidebarProps = {
  logo?: string;
};

const Sidebar: FC<SidebarProps> = ({ logo }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentUrl = location.pathname;

  return (
    <Styled.Container>
      <Styled.LogoContainer>
        <Styled.Logo src={Logo} />
      </Styled.LogoContainer>
      <Styled.MenuContainer>
        <Styled.IconContainer
          active={currentUrl === "/"}
          onClick={() => navigate("/")}
        >
          <IoMdHome size={30} />
        </Styled.IconContainer>
        <Styled.IconContainer
          active={currentUrl === "/user"}
          onClick={() => navigate("/user")}
        >
          <FaUser size={30} />
        </Styled.IconContainer>
        <Styled.IconContainer
          active={currentUrl === "/settings"}
          onClick={() => navigate("/settings")}
        >
          <IoSettings size={30} />
        </Styled.IconContainer>
        {/* <Styled.IconContainer
          active={currentUrl === "/news"}
          onClick={() => navigate("/news")}
        >
          <FaFlag size={30} />
        </Styled.IconContainer> */}
      </Styled.MenuContainer>
      <Styled.ExitContainer>
        <IoMdExit size={30} />
      </Styled.ExitContainer>
    </Styled.Container>
  );
};

export default Sidebar;
