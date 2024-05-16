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
            <Styled.MenuText active={currentUrl === ""}>Home</Styled.MenuText>
          </Styled.IconContainer>
          <Styled.IconContainer
            active={currentUrl === "quizzes"}
            onClick={() => navigate("quizzes")}
          >
            <MdOutlineQuiz size={30} />
            <Styled.MenuText active={currentUrl === "quizzes"}>
              Quizzes
            </Styled.MenuText>
          </Styled.IconContainer>
          {userType === "tutor" && (
            <Styled.IconContainer
              active={currentUrl === "students"}
              onClick={() => navigate("/students")}
            >
              <FaPeopleGroup size={30} />
              <Styled.MenuText active={currentUrl === "students"}>
                Students
              </Styled.MenuText>
            </Styled.IconContainer>
          )}
          <Styled.IconContainer
            active={currentUrl === "results"}
            onClick={() => navigate("/results")}
          >
            <FaFileSignature size={30} />
            <Styled.MenuText active={currentUrl === "results"}>
              Results
            </Styled.MenuText>
          </Styled.IconContainer>
          <Styled.IconContainer
            active={currentUrl === "profile"}
            onClick={() => navigate("/profile")}
          >
            <CgProfile size={30} />
            <Styled.MenuText active={currentUrl === "profile"}>
              Profile
            </Styled.MenuText>
          </Styled.IconContainer>
        </Styled.MenuContainer>
        <Styled.ExitContainer onClick={handleSignOut}>
          <IoMdExit size={30} />
          <Styled.MenuText exit>Exit</Styled.MenuText>
        </Styled.ExitContainer>
      </Styled.Container>
    </ModalTemplate>
  );
};

export default MenuModal;
