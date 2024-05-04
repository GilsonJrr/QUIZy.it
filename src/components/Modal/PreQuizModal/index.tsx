import React, { FC } from "react";
import * as Styled from "./styled";
import { TCollection } from "types/index";
import { useNavigate } from "react-router-dom";

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
      <Styled.Image
        src={
          item.image
            ? item.image
            : "data:image/png;base64,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"
        }
      />
      <Styled.Content>
        <Styled.Title>{item.title}</Styled.Title>
        <Styled.SubTitle>{item.subTitle}</Styled.SubTitle>
        <Styled.InfoContainer>
          <Styled.Info>{item.difficult} </Styled.Info>|
          <Styled.Info> {item.type}</Styled.Info>
        </Styled.InfoContainer>
        <Styled.OptionContainer>
          <Styled.OptionButton onClick={handleMyList}>
            Save to my list
          </Styled.OptionButton>
          <Styled.OptionButton
            onClick={() =>
              navigate(
                `/quiz?category=${item.uid}&difficulty=${item.difficult}&type=${item.type}`
              )
            }
          >
            Start
          </Styled.OptionButton>
        </Styled.OptionContainer>
      </Styled.Content>
    </Styled.Container>
  );
};

export default PreQuizModal;
