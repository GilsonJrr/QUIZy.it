import React, { FC, useEffect, useMemo } from "react";
import * as Styled from "./styled";
import * as Block from "blocks/studentProfile";
import BreadCrumbs from "components/BreadCrumbs";
import Card from "components/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { requestStudent } from "Store/students/actions";
import { useLocation } from "react-router-dom";
import Avatar from "components/Avatar";
import Table from "components/Table";
import { THeader, TResult } from "types/index";
import RenderTable from "components/renderItems/RenderTable";
import { requestResultList } from "Store/result/actions";
import LoadingSpinner from "components/LoadingSpiner";

type StudentProfileProps = {};

const StudentProfile: FC<StudentProfileProps> = () => {
  const { student, isLoading, students } = useSelector(
    (state: RootState) => state.studentReducer
  );
  const { results: studentResult, isLoading: resultLoading } = useSelector(
    (state: RootState) => state.resultReducer
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const userID = localStorage.getItem("userId");

  const studentId = new URLSearchParams(location.search).get("studentId");

  const crumbs = [
    { label: "Students", path: "/students" },
    { label: "Students Profile", path: "/students/student-profile" },
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

  const TableHeaderTitles: THeader[] = [
    { label: "Title", width: 50 },
    { label: "Score", width: 20 },
    { label: "Date", width: 20 },
    { label: "Option", width: 10, align: "center" },
  ];

  useEffect(() => {
    if (studentId) {
      dispatch(
        requestStudent({ uid: userID || "", studentId: studentId || "" })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      requestResultList({
        uid: userID || "",
        studentUid: studentId || "",
      })
    );
  }, [dispatch, userID, studentId]);

  if (isLoading || resultLoading) {
    return <LoadingSpinner />;
  }

  const sameGroupStudents = students?.filter((studentList) => {
    return (
      studentList.info?.group === student?.info?.group &&
      studentList.info?.name !== student?.info?.name
    );
  });

  return (
    <Styled.Wrapper>
      <BreadCrumbs crumbs={crumbs} />
      <Styled.Container>
        <Card
          title={"All results"}
          gridName="results"
          isEmpty={results.length === 0}
          emptyMessage={`${student?.info?.name} has't completed any quiz yet`}
        >
          <Table<TResult>
            header={TableHeaderTitles}
            content={results}
            renderItem={(item) => <RenderTable item={item} tutorView />}
          />
        </Card>
        <Card
          title={"Categorie Result"}
          children={undefined}
          gridName="categories"
          isEmpty={true}
          emptyMessage={`${student?.info?.name} has't completed any quiz yet`}
        ></Card>
        <Card
          title={"From the same group"}
          isEmpty={sameGroupStudents?.length === 0}
          gridName="group"
          emptyMessage={`${student?.info?.name} is alone here`}
        >
          <Styled.GroupContainer>
            {sameGroupStudents?.map((group) => {
              return (
                <Avatar
                  name={group.info?.name}
                  photo={group.info?.photo}
                  size="medium"
                  // onClick={() =>
                  //   navigate(
                  //     `/students/student-profile?studentId=${group.info?.uid}`
                  //   )
                  // }
                />
              );
            })}
          </Styled.GroupContainer>
        </Card>
        <Card title={""} isEmpty={false} gridName="information">
          {student && student?.info && (
            <Block.ProfileInfo student={student.info} />
          )}
        </Card>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default StudentProfile;
