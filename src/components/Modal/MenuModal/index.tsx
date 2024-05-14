import React, { FC } from "react";
import * as Styled from "./styled";
import ModalTemplate from "../ModalTemplate";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useModalContext } from "../modalContext";
import { auth } from "lib/firebase";

import { IoMdHome } from "react-icons/io";
import { FaFileSignature } from "react-icons/fa6";
import { MdOutlineQuiz } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";
// import { HiBellAlert } from "react-icons/hi2";

type MenuModalProps = {};

const MenuModal: FC<MenuModalProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { handleModal } = useModalContext();

  const { user } = useSelector((state: RootState) => state.user);

  const userType = user?.info?.userType;

  const currentUrl = location.pathname.split("/")[1];

  const handleSignOut = () => {
    //TODO: aplicar o cleanUp aqui e apagar todos os dados
    auth.signOut();
  };

  return (
    <ModalTemplate onClick={() => handleModal("")}>
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
          {/* <Styled.IconContainer
            active={currentUrl === "message"}
            onClick={() => navigate("/message")}
          >
            <HiBellAlert size={30} />
            <Styled.MenuText active={currentUrl === "message"}>
              Messages
            </Styled.MenuText>
          </Styled.IconContainer> */}
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
