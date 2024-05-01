import React, { useState } from "react";
import * as Styled from "./styled";
import SideScroller from "components/SideScroller";
import SubjectCard from "components/SubjectCard";
import { collectionType } from "types/index";
import { easyQuizzes, mediumQuizzes, hardQuizzes } from "assets/consts";
import SearchInput from "components/inputs/SearchInput";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const QuizDashboard = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const renderItem = (item: collectionType) => {
    return <SubjectCard subject={item} />;
  };

  const HistoryQuizzes = [
    ...easyQuizzes.filter((quiz) => quiz.title === "History"),
    ...mediumQuizzes.filter((quiz) => quiz.title === "History"),
    ...hardQuizzes.filter((quiz) => quiz.title === "History"),
  ];

  const searched = [
    ...easyQuizzes.filter((quiz) =>
      quiz.title.toUpperCase().includes(search.toUpperCase())
    ),
    ...mediumQuizzes.filter((quiz) =>
      quiz.title.toUpperCase().includes(search.toUpperCase())
    ),
    ...hardQuizzes.filter((quiz) =>
      quiz.title.toUpperCase().includes(search.toUpperCase())
    ),
  ];

  const myList: collectionType[] = JSON.parse(
    localStorage.getItem("netQuiz_my_list") || "null"
  );

  const QuizzesDisplay = [
    {
      title: <h2>My list</h2>,
      displayQuantity: 5,
      collection: myList,
    },
    {
      title: <h2>All Quizes</h2>,
      displayQuantity: 5,
      collection: [...easyQuizzes, ...mediumQuizzes, ...hardQuizzes],
    },
    {
      title: <h2>Easy Quizes</h2>,
      displayQuantity: 5,
      collection: easyQuizzes,
    },
    {
      title: <h2>Medium Quizes</h2>,
      displayQuantity: 5,
      collection: mediumQuizzes,
    },
    {
      title: <h2>Hard Quizes</h2>,
      displayQuantity: 5,
      collection: hardQuizzes,
    },
    {
      title: <h2>History Quizes</h2>,
      displayQuantity: 5,
      collection: HistoryQuizzes,
    },
  ];

  return (
    <Styled.Container>
      <Styled.Card gridName="card1" scrollable>
        <Styled.CardTitle>New Quizes</Styled.CardTitle>
        <Styled.CardInner>
          {easyQuizzes?.map((easy) => {
            return (
              <Styled.QuizCard
                onClick={() =>
                  navigate(
                    `/quiz?category=${easy.uid}&difficulty=${easy.difficult}&type=${easy.type}`
                  )
                }
              >
                <Styled.QuizImage />
                <Styled.QuizTitlesContainer>
                  <Styled.QuizTitle>{easy.title}</Styled.QuizTitle>
                  <Styled.QuizInfo>
                    {easy.difficult} | {easy.type}
                  </Styled.QuizInfo>
                  <Styled.StartButton>Start</Styled.StartButton>
                </Styled.QuizTitlesContainer>
              </Styled.QuizCard>
            );
          })}
        </Styled.CardInner>
      </Styled.Card>
      <Styled.Card gridName="card2">
        <Styled.CardTitle>Completed Quizzes</Styled.CardTitle>
      </Styled.Card>
      <Styled.Card gridName="card3" scrollable>
        <Styled.CardTitle>My list</Styled.CardTitle>
        <Styled.CardInner>
          {myList?.map((easy) => {
            return (
              <Styled.QuizCard>
                <Styled.QuizImage />
                <Styled.QuizTitlesContainer>
                  <Styled.QuizTitle>{easy.title}</Styled.QuizTitle>
                  <Styled.QuizInfo>
                    {easy.difficult} | {easy.type}
                  </Styled.QuizInfo>
                  <Styled.StartButton>Start</Styled.StartButton>
                </Styled.QuizTitlesContainer>
              </Styled.QuizCard>
            );
          })}
        </Styled.CardInner>
      </Styled.Card>
    </Styled.Container>
  );
};

export default QuizDashboard;
