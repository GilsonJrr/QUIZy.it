import React, { FC } from "react";
import * as Styled from "./styled";
import { TCollection } from "types/index";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { BsSubstack } from "react-icons/bs";
import EmptyImage from "assets/images/Empty_quiz_image_state.png";

type PreQuizModalProps = {
  item: TCollection;
};

const PreQuizModal: FC<PreQuizModalProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleMyList = () => {
    let initialItems: TCollection[] | null = JSON.parse(
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
    <Styled.Container>
      <Styled.Image src={item.image ? item.image : EmptyImage} />
      <Styled.Content>
        <Styled.Title>{item.title}</Styled.Title>
        <Styled.SubTitle>{item.subTitle}</Styled.SubTitle>
        <Styled.InfoContainer>
          <Styled.Info>{item.difficult} </Styled.Info>|
          <Styled.Info> {item.type}</Styled.Info>
        </Styled.InfoContainer>
        <Styled.OptionContainer>
          <Styled.OptionButton onClick={handleMyList}>
            My list
            <BsSubstack size={12} />
          </Styled.OptionButton>
          <Styled.OptionButton
            onClick={() =>
              navigate(
                `/quiz?amount=10&category=${item.uid}&difficulty=${item.difficult}&type=${item.type}`
              )
            }
          >
            Start
            <FaPlay size={12} />
          </Styled.OptionButton>
        </Styled.OptionContainer>
      </Styled.Content>
    </Styled.Container>
  );
};

export default PreQuizModal;
