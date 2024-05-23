import React, { FC } from "react";
import * as Styled from "./styled";
import ModalTemplate from "../ModalTemplate";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useModalContext } from "../modalContext";

import { IoMdHome } from "react-icons/io";
import { FaFileSignature } from "react-icons/fa6";
import { MdOutlineQuiz } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";

import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { requestSignOut } from "Store/auth/actions";
import { Title } from "components/ui/Typography/styled";

type MenuModalProps = {};

const MenuModal: FC<MenuModalProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleModal } = useModalContext();

  const { user } = useSelector((state: RootState) => state.user);

  const userType = user?.info?.userType;

  const currentUrl = location.pathname.split("/")[1];

  const handleSignOut = () => {
    dispatch(requestSignOut());
  };

  const handleCloseProfile = () => {
    handleModal("");
  };

  return (
    <ModalTemplate onClick={handleCloseProfile}>
      <Styled.Container>
        <Styled.DragClose />
        <Styled.MenuContainer>
          <Styled.IconContainer
            active={currentUrl === ""}
            onClick={() => navigate("/")}
          >
            <IoMdHome size={30} />
            <Title color={currentUrl === "" ? "light" : "default"}>Home</Title>
          </Styled.IconContainer>
          <Styled.IconContainer
            active={currentUrl === "quizzes"}
            onClick={() => navigate("quizzes")}
          >
            <MdOutlineQuiz size={30} />
            <Title color={currentUrl === "quizzes" ? "light" : "default"}>
              Quizzes
            </Title>
          </Styled.IconContainer>
          {userType === "tutor" && (
            <Styled.IconContainer
              active={currentUrl === "students"}
              onClick={() => navigate("/students")}
            >
              <FaPeopleGroup size={30} />
              <Title color={currentUrl === "students" ? "light" : "default"}>
                Students
              </Title>
            </Styled.IconContainer>
          )}
          <Styled.IconContainer
            active={currentUrl === "results"}
            onClick={() => navigate("/results")}
          >
            <FaFileSignature size={30} />
            <Title color={currentUrl === "results" ? "light" : "default"}>
              Results
            </Title>
          </Styled.IconContainer>
          <Styled.IconContainer
            active={currentUrl === "profile"}
            onClick={() => navigate("/profile")}
          >
            <CgProfile size={30} />
            <Title color={currentUrl === "profile" ? "light" : "default"}>
              Profile
            </Title>
          </Styled.IconContainer>
        </Styled.MenuContainer>
        <Styled.ExitContainer onClick={handleSignOut}>
          <IoMdExit size={30} />
          <Title color="error">Exit</Title>
        </Styled.ExitContainer>
      </Styled.Container>
    </ModalTemplate>
  );
};

export default MenuModal;
