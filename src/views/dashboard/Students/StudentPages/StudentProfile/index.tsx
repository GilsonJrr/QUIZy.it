import React, { FC, useEffect, useMemo, useState } from "react";
import * as Styled from "./styled";
import * as Block from "blocks/studentProfile";
import BreadCrumbs from "components/BreadCrumbs";
import Card from "components/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { requestStudent } from "Store/students/actions";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "components/Avatar";
import Table from "components/Table";
import { THeader, TResult } from "types/index";
import RenderTable from "components/renderItems/RenderTable";
import { requestResultList } from "Store/result/actions";
import LoadingSpinner from "components/LoadingSpiner";
import { LoadingContainerFullPage } from "components/Container/styled";
import ProgressBar from "components/ProgressBar";
import { requestQuizList } from "Store/quiz/actions";
import Tabs from "components/Tabs";
import useDeviceType from "hooks/useDeviceType";

type StudentProfileProps = {};

const StudentProfile: FC<StudentProfileProps> = () => {
  const {
    student,
    isLoading: studentLoading,
    students,
  } = useSelector((state: RootState) => state.student);
  const { results: studentResult, isLoading: resultLoading } = useSelector(
    (state: RootState) => state.result
  );
  const { quizzes, isLoading: quizLoading } = useSelector(
    (state: RootState) => state.quiz
  );
  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useDeviceType();

  const studentId = new URLSearchParams(location.search).get("studentId");
  const [tab, setTab] = useState("Info");

  const crumbs = [
    { label: "Students", path: "/students" },
    { label: "Students Profile", path: "" },
  ];

  const results = useMemo(() => {
    return studentResult
      ? studentResult?.map((res) => {
          return {
            date: res.date || "",
            quiz: res.quizTitle || "",
            score: res.score || "",
            quizId: res.quizUid || "",
            amount: res?.amount,
            quizResume: res?.resume,
          };
        })
      : [];
  }, [studentResult]);

  const CategoryResults = useMemo(() => {
    return studentResult
      ? studentResult?.map((res) => {
          return {
            category: res.quizCategory,
            size: parseInt(res.score || ""),
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
    if (user && studentId) {
      dispatch(
        requestStudent({ uid: user?.info?.uid || "", studentId: studentId })
      );
    }
  }, [dispatch, studentId, user]);

  useEffect(() => {
    dispatch(
      requestResultList({
        uid: user?.info?.uid || "",
        studentUid: studentId || "",
      })
    );
  }, [dispatch, studentId, user]);

  useEffect(() => {
    if (quizzes === undefined) {
      dispatch(requestQuizList({ uid: user?.info?.uid || "" }));
    }
  }, [dispatch, quizzes, user]);

  const sumByCategory = (data: any[]) => {
    return data?.reduce((acc, cur) => {
      const categoryIndex = acc.findIndex(
        (item: { category: any }) => item.category === cur.category
      );
      if (categoryIndex !== -1) {
        acc[categoryIndex].size += cur.size;
      } else {
        acc.push({ category: cur.category, size: cur.size });
      }
      return acc;
    }, []);
  };

  const categoryTotal = sumByCategory(
    quizzes?.map((quiz) => {
      return { category: quiz.category, size: quiz.questions?.length };
    }) as any[]
  );

  const studentTotal = sumByCategory(CategoryResults);

  const sameGroupStudents = students?.filter((studentList) => {
    return (
      studentList.info?.group === student?.info?.group &&
      studentList.info?.name !== student?.info?.name
    );
  });

  if (studentLoading || resultLoading || quizLoading) {
    return (
      <LoadingContainerFullPage>
        <LoadingSpinner size="big" />
      </LoadingContainerFullPage>
    );
  }

  console.log("aqui cara", user?.info?.uid, studentId);

  return (
    <Styled.Wrapper>
      <BreadCrumbs crumbs={crumbs} />
      {isMobile && (
        <Tabs
          tabs={[{ label: "Info" }, { label: "Result" }, { label: "Category" }]}
          activeTab={(tab) => setTab(tab)}
          radius={10}
        />
      )}
      <Styled.Container>
        {(!isMobile || tab === "Result") && (
          <Card
            title={isMobile ? "" : "All results"}
            gridName="results"
            isEmpty={results.length === 0}
            emptyMessage={`${student?.info?.name} has't completed any quiz yet`}
            innerCard={isMobile}
          >
            <Table<TResult>
              header={TableHeaderTitles}
              content={results}
              renderItem={(item) => <RenderTable item={item} tutorView />}
            />
          </Card>
        )}
        {(!isMobile || tab === "Category") && (
          <>
            <Card
              title={isMobile ? "" : "Categorie Result"}
              gridName="categories"
              isEmpty={false}
              emptyMessage={`${student?.info?.name} has't completed any quiz yet`}
              innerCard={isMobile}
            >
              <Styled.ProgressWrapper>
                {categoryTotal?.map((category: any) => {
                  const studentResult = studentTotal.filter(
                    (e: any) => e.category === category.category
                  )[0]?.size;
                  return (
                    <Styled.ProgressContainer>
                      <Styled.ProgressTitle>
                        {category.category === "categoryLess"
                          ? "Uncategorized"
                          : category.category}
                      </Styled.ProgressTitle>
                      <ProgressBar
                        progress={(studentResult / category.size) * 100}
                      />
                    </Styled.ProgressContainer>
                  );
                })}
              </Styled.ProgressWrapper>
            </Card>
            <Card
              title={"From the same group"}
              isEmpty={sameGroupStudents?.length === 0}
              gridName="group"
              emptyMessage={`${student?.info?.name} is alone here`}
              innerCard={isMobile}
            >
              <Styled.GroupContainer>
                {sameGroupStudents?.map((group) => {
                  return (
                    <Avatar
                      name={group.info?.name}
                      photo={group.info?.photo}
                      size="medium"
                      onClick={() =>
                        navigate(
                          `/students/student-profile?studentId=${group.info?.uid}`
                        )
                      }
                    />
                  );
                })}
              </Styled.GroupContainer>
            </Card>
          </>
        )}
        {(!isMobile || tab === "Info") && (
          <Card
            title={""}
            isEmpty={false}
            gridName="information"
            innerCard={isMobile}
          >
            {student && student?.info && (
              <Block.ProfileInfo student={student.info} />
            )}
          </Card>
        )}
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default StudentProfile;
