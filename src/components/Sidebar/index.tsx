import React, { FC } from "react";
import * as Styled from "./styled";

//Icons
import { IoMdHome } from "react-icons/io";
import { FaFileSignature } from "react-icons/fa6";
import { MdOutlineQuiz } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestSignOut } from "Store/auth/actions";
import { useAnimation } from "hooks/useAnimation";

type SidebarProps = {
  display?: boolean;
  onClose?: () => void;
  triggerAnimation?: (trigger: boolean) => void;
};

const Sidebar: FC<SidebarProps> = ({ display, onClose }) => {
  const { user, userStudent } = useSelector((state: RootState) => state.user);
  const userType = user?.info?.userType || userStudent?.userType;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUrl = location.pathname.split("/")[1];
  const { animate } = useAnimation();

  const handleRedirect = (navigatePath: string) => {
    onClose?.();
    animate(100);
    const timeout = setTimeout(() => {
      navigate(navigatePath);
    }, 100);
    return () => clearTimeout(timeout);
  };

  const handleSignOut = () => {
    dispatch(requestSignOut());
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
          </Styled.IconContainer>
          <Styled.IconContainer
            active={currentUrl === "quizzes"}
            onClick={() => handleRedirect("/quizzes")}
          >
            <MdOutlineQuiz size={30} />
          </Styled.IconContainer>
          {userType === "tutor" && (
            <Styled.IconContainer
              active={currentUrl === "students"}
              onClick={() => handleRedirect("/students")}
            >
              <FaPeopleGroup size={30} />
            </Styled.IconContainer>
          )}
          <Styled.IconContainer
            active={currentUrl === "results"}
            onClick={() => handleRedirect("/results")}
          >
            <FaFileSignature size={30} />
          </Styled.IconContainer>
        </Styled.MenuContainer>
        <Styled.ExitContainer>
          <IoMdExit size={30} onClick={handleSignOut} />
        </Styled.ExitContainer>
      </Styled.ContainerBackGround>
    </Styled.Container>
  );
};

export default Sidebar;
