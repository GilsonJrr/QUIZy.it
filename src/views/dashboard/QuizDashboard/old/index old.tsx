import React, { useState } from "react";
import * as Styled from "../styled";
import SideScroller from "components/SideScroller";
import SubjectCard from "components/SubjectCard";
import { TCollection } from "types/index";
import { easyQuizzes, mediumQuizzes, hardQuizzes } from "assets/consts";
import SearchInput from "components/inputs/SearchInput";
import { FaRegUser } from "react-icons/fa";

const QuizDashboard = () => {
  const [search, setSearch] = useState("");
  const renderItem = (item: TCollection) => {
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

  const myList = JSON.parse(localStorage.getItem("netQuiz_my_list") || "null");

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
      {/* <Styled.Header>
        <Styled.SearchInputHeader>
          <SearchInput value={search} setValue={setSearch} />
        </Styled.SearchInputHeader>
        <Styled.RightSideHeader>
          <FaRegUser size={40} />
        </Styled.RightSideHeader>
      </Styled.Header> */}
      {/* <Styled.QuizzesContainer>
        {search && searched.length === 0 && <h1>no results</h1>}
        {search && (
          <SideScroller<TCollection>
            displayQuantity={5}
            collection={searched}
            renderItem={(item) => renderItem(item)}
            backgroundColor="#ebf0ef"
          />
        )}
        {QuizzesDisplay.map((quizzes) => {
          return (
            <SideScroller<TCollection>
              title={quizzes.title}
              displayQuantity={quizzes.displayQuantity}
              collection={quizzes.collection}
              renderItem={(item) => renderItem(item)}
              backgroundColor="#ebf0ef"
            />
          );
        })}
      </Styled.QuizzesContainer> */}
    </Styled.Container>
  );
};

export default QuizDashboard;
