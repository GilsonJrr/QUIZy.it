import React, { FC } from "react";
import * as Styled from "./styled";

//Icons
import { IoMdHome } from "react-icons/io";
import { FaFileSignature } from "react-icons/fa6";
import { MdOutlineQuiz } from "react-icons/md";
import { HiBellAlert } from "react-icons/hi2";
import { FaPeopleGroup } from "react-icons/fa6";

import { IoMdExit } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import useDeviceType from "hooks/useDeviceType";
import { useSelector } from "react-redux";
import { auth } from "lib/firebase";
import { RootState } from "Store/root-reducer";

type SidebarProps = {
  logo?: string;
  display?: boolean;
  onClose?: () => void;
};

const Sidebar: FC<SidebarProps> = ({ logo, display, onClose }) => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const userType = user?.info?.userType;
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useDeviceType();

  const currentUrl = location.pathname.split("/")[1];
  console.log("currentUrl", location);

  const handleRedirect = (navigatePath: string) => {
    navigate(navigatePath);
    onClose?.();
  };

  const handleSignOut = () => {
    //TODO: aplicar o cleanUp aqui e apagar todos os dados
    auth.signOut();
  };

  return (
    <Styled.Container showMenu={display}>
      <Styled.ContainerBackGround onClick={onClose}>
        <Styled.MenuContainer>
          <Styled.IconContainer
            active={currentUrl === ""}
            onClick={() => handleRedirect("/")}
          >
            <IoMdHome size={30} />
            <Styled.MenuText active={currentUrl === "/"}>Home</Styled.MenuText>
          </Styled.IconContainer>
          <Styled.IconContainer
            active={currentUrl === "quizzes"}
            onClick={() => handleRedirect("/quizzes")}
          >
            <MdOutlineQuiz size={30} />
            <Styled.MenuText active={currentUrl === "/quizzes"}>
              Quizzes
            </Styled.MenuText>
          </Styled.IconContainer>
          {userType === "tutor" && (
            <Styled.IconContainer
              active={currentUrl === "students"}
              onClick={() => handleRedirect("/students")}
            >
              <FaPeopleGroup size={30} />
              <Styled.MenuText active={currentUrl === "/students"}>
                Students
              </Styled.MenuText>
            </Styled.IconContainer>
          )}
          <Styled.IconContainer
            active={currentUrl === "results"}
            onClick={() => handleRedirect("/results")}
          >
            <FaFileSignature size={30} />
            <Styled.MenuText active={currentUrl === "/results"}>
              Results
            </Styled.MenuText>
          </Styled.IconContainer>
          {isMobile && (
            <Styled.IconContainer
              active={currentUrl === "message"}
              onClick={() => handleRedirect("/message")}
            >
              <HiBellAlert size={30} />
              <Styled.MenuText active={currentUrl === "/message"}>
                Messages
              </Styled.MenuText>
            </Styled.IconContainer>
          )}
        </Styled.MenuContainer>
        <Styled.ExitContainer>
          <IoMdExit size={30} onClick={handleSignOut} />
          <Styled.MenuText exit>Exit</Styled.MenuText>
        </Styled.ExitContainer>
      </Styled.ContainerBackGround>
    </Styled.Container>
  );
};

export default Sidebar;
