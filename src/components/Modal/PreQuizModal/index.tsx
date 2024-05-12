import React, { FC } from "react";
import * as Styled from "./styled";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { BsSubstack } from "react-icons/bs";
import EmptyImage from "assets/images/Empty_quiz_image_state.png";
import ModalTemplate from "../ModalTemplate";
import { useModalContext } from "../modalContext";
import { QuizTypeValues } from "Store/quiz/types";

type PreQuizModalProps = {
  item: QuizTypeValues;
};

const PreQuizModal: FC<PreQuizModalProps> = ({ item }) => {
  const navigate = useNavigate();
  const { handleModal } = useModalContext();

  const handleMyList = () => {
    let initialItems: QuizTypeValues[] | null = JSON.parse(
      localStorage.getItem("netQuiz_my_list") || "null"
    );

    if (!initialItems) {
      initialItems = [];
    }

    initialItems.push(item);

    console.log("local: ", initialItems);
    localStorage.setItem("netQuiz_my_list", JSON.stringify(initialItems));
  };

  return (
    <ModalTemplate onClick={() => handleModal("")}>
      <Styled.Container>
        <Styled.Image src={item.image ? item.image : EmptyImage} />
        <Styled.Content>
          <Styled.Title>{item.title}</Styled.Title>
          <Styled.SubTitle>{item.description}</Styled.SubTitle>
          <Styled.InfoContainer>
            <Styled.Info>{item.category} </Styled.Info>|
            <Styled.Info> {item.type}</Styled.Info>
          </Styled.InfoContainer>
          <Styled.OptionContainer>
            <Styled.OptionButton onClick={handleMyList}>
              My list
              <BsSubstack size={12} />
            </Styled.OptionButton>
            <Styled.OptionButton
              onClick={() => navigate(`/quiz?quizId=${item.id}`)}
            >
              Start
              <FaPlay size={12} />
            </Styled.OptionButton>
          </Styled.OptionContainer>
        </Styled.Content>
      </Styled.Container>
    </ModalTemplate>
  );
};

export default PreQuizModal;
