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
import Tooltip from "components/Tooltip";

import { IoMdAddCircleOutline } from "react-icons/io";
import { MdPlaylistAddCheck } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

type SidebarProps = {
  logo?: string;
  display?: boolean;
  onClose?: () => void;
};

const Sidebar: FC<SidebarProps> = ({ logo, display, onClose }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const userType = user?.info?.userType;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUrl = location.pathname.split("/")[1];

  const handleRedirect = (navigatePath: string) => {
    navigate(navigatePath);
    onClose?.();
  };

  const handleSignOut = () => {
    dispatch(requestSignOut());
  };

  const quizzesToolTipOptions = () => {
    return (
      <Styled.SideBarToolTipOptionContainer>
        <Styled.SideBarOption onClick={() => navigate("/quizzes/quiz-create")}>
          <IoMdAddCircleOutline size={40} /> Add quiz
        </Styled.SideBarOption>
        <Styled.SideBarOption
          onClick={() => navigate("/quizzes/category-create")}
        >
          <MdPlaylistAddCheck size={40} /> Add category
        </Styled.SideBarOption>
      </Styled.SideBarToolTipOptionContainer>
    );
  };

  const studentsToolTipOptions = () => {
    return (
      <Styled.SideBarToolTipOptionContainer>
        <Styled.SideBarOption
          onClick={() => navigate("/students/student-create")}
        >
          <FaUserEdit size={40} /> Add student
        </Styled.SideBarOption>
        <Styled.SideBarOption
          onClick={() => navigate("/students/group-create")}
        >
          <IoMdAddCircleOutline size={40} />
          Add group
        </Styled.SideBarOption>
      </Styled.SideBarToolTipOptionContainer>
    );
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
          <Tooltip
            toolTipContent={quizzesToolTipOptions()}
            position={"right"}
            onHover
            width={"100%"}
          >
            <Styled.IconContainer
              active={currentUrl === "quizzes"}
              onClick={() => handleRedirect("/quizzes")}
            >
              <MdOutlineQuiz size={30} />
              <Styled.MenuText active={currentUrl === "/quizzes"}>
                Quizzes
              </Styled.MenuText>
            </Styled.IconContainer>
          </Tooltip>
          {userType === "tutor" && (
            <Tooltip
              toolTipContent={studentsToolTipOptions()}
              position={"right"}
              onHover
              width={"100%"}
            >
              <Styled.IconContainer
                active={currentUrl === "students"}
                onClick={() => handleRedirect("/students")}
              >
                <FaPeopleGroup size={30} />
                <Styled.MenuText active={currentUrl === "/students"}>
                  Students
                </Styled.MenuText>
              </Styled.IconContainer>
            </Tooltip>
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
