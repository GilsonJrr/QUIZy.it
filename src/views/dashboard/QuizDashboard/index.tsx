import React, { useMemo, useState } from "react";
import * as Styled from "./styled";
import SideScroller from "components/SideScroller";
import SubjectCard from "components/SubjectCard";
import { TResult, TCollection } from "types/index";
import { easyQuizzes, mediumQuizzes, hardQuizzes } from "assets/consts";
import SearchInput from "components/inputs/SearchInput";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Table from "components/Table";
import Card from "components/Card";
import RenderTable from "components/renderItems/RenderTable";
import RenderQuizCard from "components/renderItems/RenderQuizCard";

const QuizDashboard = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

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

  const myList: TCollection[] = JSON.parse(
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

  const TableHeaderTitles = [
    { label: "Title", width: 50 },
    { label: "Score", width: 25 },
    { label: "Date", width: 25 },
  ];

  const results = useMemo(() => {
    const resultStorage = localStorage.getItem("netQuiz_my_results");
    return resultStorage ? JSON.parse(resultStorage) : [];
  }, []);

  return (
    <Styled.Container>
      <Card
        gridName="card1"
        title="New Quizes"
        isEmpty={easyQuizzes && easyQuizzes.length < 0}
        emptyMessage={"No new quiz available at this time. Please check later"}
        scrollable
      >
        {easyQuizzes?.map((item) => {
          return <RenderQuizCard item={item} />;
        })}
      </Card>
      <Card
        gridName="card3"
        title="My list"
        isEmpty={myList && myList.length < 0}
        emptyMessage={
          "Your List is empty add quizzes here to do it later or retry it"
        }
        scrollable
      >
        {myList?.map((list) => {
          return <RenderQuizCard item={list} />;
        })}
      </Card>
      <Card
        gridName="card2"
        title="Completed Quizzes"
        isEmpty={results?.length === 0}
        emptyMessage={"you have not completed any quiz so far"}
        redirectTo="Results"
        redirectPath="/results"
      >
        <Table<TResult>
          header={TableHeaderTitles}
          content={results.slice(0, 2)}
          renderItem={(item) => <RenderTable item={item} />}
        />
      </Card>
    </Styled.Container>
  );
};

export default QuizDashboard;
