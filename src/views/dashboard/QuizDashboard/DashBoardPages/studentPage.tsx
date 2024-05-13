import React, { useEffect, useMemo } from "react";
import * as Styled from "../styled";
import { TResult, TCollection, THeader } from "types/index";
import Table from "components/Table";
import Card from "components/Card";
import RenderTable from "components/renderItems/RenderTable";
import RenderQuizCard from "components/renderItems/RenderQuizCard";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestQuizList } from "Store/quiz/actions";

export const StudentPage = () => {
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizReducer);
  const { userStudent } = useSelector((state: RootState) => state.userReducer);
  const { results: studentResult } = useSelector(
    (state: RootState) => state.resultReducer
  );

  const myList: TCollection[] = JSON.parse(
    localStorage.getItem("netQuiz_my_list") || "null"
  );

  const TableHeaderTitles: THeader[] = [
    { label: "Title", width: 50 },
    { label: "Score", width: 20 },
    { label: "Date", width: 20 },
    { label: "Option", width: 10, align: "center" },
  ];

  // const results = useMemo(() => {
  //   const resultStorage = localStorage.getItem("netQuiz_my_results");
  //   return resultStorage ? JSON.parse(resultStorage).reverse() : [];
  // }, []);

  const results = useMemo(() => {
    return studentResult
      ? studentResult?.map((res) => {
          return {
            date: res.date || "",
            quiz: res.quizTitle || "",
            score: `${res.score} / ${res.amount}`,
            quizId: res.quizUid || "",
          };
        })
      : [];
  }, [studentResult]);

  useEffect(() => {
    dispatch(requestQuizList({ uid: userStudent?.tutorID || "", size: 50 }));
  }, [dispatch, userStudent]);

  return (
    <Styled.Container>
      <Card
        gridName="card1"
        title="New Quizes"
        isEmpty={quizzes?.length === 0}
        emptyMessage={"No new quiz available at this time. Please check later"}
        scrollable
      >
        {quizzes?.map((item) => {
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
        {/* {myList?.map((list) => {
          return <RenderQuizCard item={list} />;
        })} */}
        <></>
      </Card>
      <Card
        gridName="card2"
        title="Last Completed Quizzes"
        isEmpty={results?.length === 0}
        emptyMessage={"you have not completed any quiz so far"}
        redirectTo="Results"
        redirectPath="/results"
      >
        <Table<TResult>
          header={TableHeaderTitles}
          content={results.slice(0, 5)}
          renderItem={(item) => <RenderTable item={item} />}
        />
      </Card>
    </Styled.Container>
  );
};
