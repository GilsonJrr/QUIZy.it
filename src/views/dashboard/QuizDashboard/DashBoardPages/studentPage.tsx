import React, { useEffect, useMemo, useState } from "react";
import * as Styled from "../styled";
import { TResult, THeader } from "types/index";
import Table from "components/Table";
import Card from "components/Card";
import RenderTable from "components/renderItems/RenderTable";
import RenderQuizCard from "components/renderItems/RenderQuizCard";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useDispatch } from "react-redux";
import { requestQuizList } from "Store/quiz/actions";
import { requestResultList } from "Store/result/actions";
import { requestMyListList } from "Store/myList/actions";
import { MyListTypeValues } from "Store/myList/types";
import useDeviceType from "hooks/useDeviceType";
import Tabs from "components/Tabs";

export const StudentPage = () => {
  const dispatch = useDispatch();
  const isMobile = useDeviceType();

  const { quizzes, isLoading } = useSelector((state: RootState) => state.quiz);

  const { userStudent } = useSelector((state: RootState) => state.user);
  const { results: studentResult, isLoading: resultLoading } = useSelector(
    (state: RootState) => state.result
  );
  const { myLists } = useSelector((state: RootState) => state.myList);

  const [tab, setTab] = useState("Quizzes");

  const myList = useMemo(() => {
    if (!quizzes || !Array.isArray(myLists)) {
      return [];
    }
    return quizzes?.filter(
      (item) => myLists && myLists?.includes(item.id as MyListTypeValues)
    );
  }, [myLists, quizzes]);

  const TableHeaderTitles: THeader[] = [
    { label: "Title", width: 50 },
    { label: "Score", width: 20 },
    { label: "Date", width: 20 },
    { label: "Option", width: 10, align: "center" },
  ];

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
    if (quizzes === undefined) {
      dispatch(requestQuizList({ uid: userStudent?.tutorID || "", size: 50 }));
    }
  }, [dispatch, quizzes, userStudent]);

  useEffect(() => {
    if (studentResult === undefined) {
      dispatch(
        requestResultList({
          uid: userStudent?.tutorID || "",
          studentUid: userStudent?.uid || "",
        })
      );
    }
  }, [dispatch, studentResult, userStudent]);

  useEffect(() => {
    const myListRequest = {
      tutorUid: userStudent?.tutorID || "",
      uid: userStudent?.tutorID || "",
      studentUid: userStudent?.uid || "",
      // quizUid: item?.id,
    };
    if (myLists === undefined) {
      dispatch(requestMyListList(myListRequest));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, myLists]);

  return (
    <Styled.Container>
      {isMobile && (
        <Styled.TabContainer>
          <Tabs
            tabs={[
              { label: "Quizzes" },
              { label: "My list" },
              { label: "Results" },
            ]}
            activeTab={(tab) => setTab(tab)}
            radius={5}
          />
        </Styled.TabContainer>
      )}
      {(tab === "Quizzes" || !isMobile) && (
        <Card
          gridName="card1"
          title={isMobile ? "" : "New Quizes"}
          isEmpty={quizzes?.length === 0}
          emptyMessage={
            "No new quiz available at this time. Please check later"
          }
          scrollable
          isLoading={isLoading}
          innerCard={isMobile}
        >
          {quizzes?.map((item) => {
            return <RenderQuizCard item={item} />;
          })}
        </Card>
      )}
      {(tab === "My list" || !isMobile) && (
        <Card
          gridName="card3"
          title={isMobile ? "" : "My list"}
          isEmpty={myList?.length === 0}
          emptyMessage={
            "Your List is empty add quizzes here to do it later or retry it"
          }
          scrollable
          innerCard={isMobile}
        >
          {myList?.map((list) => {
            return <RenderQuizCard item={list} />;
          })}
        </Card>
      )}
      {(tab === "Results" || !isMobile) && (
        <Card
          gridName="card2"
          title={isMobile ? "" : "Last Completed Quizzes"}
          isEmpty={results?.length === 0}
          emptyMessage={"you have not completed any quiz so far"}
          redirectTo="Results"
          redirectPath="/results"
          isLoading={resultLoading}
          innerCard={isMobile}
        >
          <Table<TResult>
            header={TableHeaderTitles}
            content={results.slice(0, 5) as TResult[]}
            renderItem={(item) => <RenderTable item={item} />}
          />
        </Card>
      )}
    </Styled.Container>
  );
};
