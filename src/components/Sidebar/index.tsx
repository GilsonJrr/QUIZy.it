import React, { FC } from "react";
import * as Styled from "./styled";

//Icons
import { IoMdHome } from "react-icons/io";
import { FaFileSignature } from "react-icons/fa6";
import { MdOutlineQuiz } from "react-icons/md";

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
      <Styled.MenuContainer>
        <Styled.IconContainer
          active={currentUrl === "/"}
          onClick={() => navigate("/")}
        >
          <IoMdHome size={30} />
        </Styled.IconContainer>
        <Styled.IconContainer
          active={currentUrl === "/quizzes"}
          onClick={() => navigate("/quizzes")}
        >
          <MdOutlineQuiz size={30} />
        </Styled.IconContainer>
        <Styled.IconContainer
          active={currentUrl === "/results"}
          onClick={() => navigate("/results")}
        >
          <FaFileSignature size={30} />
        </Styled.IconContainer>
      </Styled.MenuContainer>
      <Styled.ExitContainer>
        <IoMdExit size={30} />
      </Styled.ExitContainer>
    </Styled.Container>
  );
};

export default Sidebar;
