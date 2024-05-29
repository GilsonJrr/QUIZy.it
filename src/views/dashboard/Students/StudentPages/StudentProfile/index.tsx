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
import { requestResultList } from "Store/result/actions";
import LoadingSpinner from "components/LoadingSpiner";
import { LoadingContainerFullPage } from "components/Container/styled";
import ProgressBar from "components/ProgressBar";
import { requestQuizList } from "Store/quiz/actions";
import Tabs from "components/Tabs";
import useDeviceType from "hooks/useDeviceType";
import StudentResultTable from "components/Table/StudentResultTable";
import { sumByCategory } from "utils/index";
import { Title } from "components/ui/Typography/styled";

type StudentProfileProps = {};

const StudentProfile: FC<StudentProfileProps> = () => {
  const {
    student: otherStudent,
    isLoading: studentLoading,
    students,
  } = useSelector((state: RootState) => state.student);
  const { quizzes, isLoading: quizLoading } = useSelector(
    (state: RootState) => state.quiz
  );
  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useDeviceType();

  const studentId = new URLSearchParams(location.search).get("studentId");
  const openTab = new URLSearchParams(location.search).get("tab");

  const [tab, setTab] = useState("Info");

  const student =
    students?.filter((student) => student.info?.uid === studentId)[0] ||
    otherStudent;

  const crumbs = [
    { label: "Students", path: "/students" },
    { label: "Students Profile", path: "" },
  ];

  const CategoryResults = useMemo(() => {
    const myResults = quizzes?.map((student) => ({
      results: Object.fromEntries(
        Object.entries(student.results || {}).filter(
          ([key, value]) => key === studentId
        )
      ),
    }));
    return myResults
      ? Object.values(myResults)
          ?.map((res) => {
            return Object.values(res.results)[0]
              ? {
                  category: Object.values(res.results)[0].quizCategory,
                  size: parseInt(Object.values(res.results)[0].score || ""),
                }
              : undefined;
          })
          .filter((empty) => empty !== undefined)
      : [];
  }, [quizzes, studentId]);

  useEffect(() => {
    if (!student) {
      dispatch(
        requestStudent({
          uid: user?.info?.uid || "",
          studentId: studentId || "",
        })
      );
    }
  }, [dispatch, student, studentId, user]);

  useEffect(() => {
    if (quizzes === undefined) {
      dispatch(
        requestResultList({
          uid: user?.info?.uid || "",
          studentUid: studentId || "",
        })
      );
    }
  }, [dispatch, quizzes, studentId, user]);

  useEffect(() => {
    if (quizzes === undefined) {
      dispatch(requestQuizList({ uid: user?.info?.uid || "" }));
    }
  }, [dispatch, quizzes, user]);

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

  const handleChangeStudent = (uid: string) => {
    navigate(`/students/student-profile?studentId=${uid}`);
  };

  if (studentLoading || quizLoading) {
    return (
      <LoadingContainerFullPage>
        <LoadingSpinner size="big" />
      </LoadingContainerFullPage>
    );
  }

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
            title={"Results"}
            gridName="results"
            isEmpty={false}
            emptyMessage={`${student?.info?.name} has't completed any quiz yet`}
            innerCard={isMobile}
          >
            <StudentResultTable
              studentID={studentId || ""}
              tutorView
              itemKey="quiz"
            />
          </Card>
        )}
        {(!isMobile || tab === "Category") && (
          <>
            <Card
              title={"Categories"}
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
                      <Title size="small">
                        {category.category === "categoryLess"
                          ? "Uncategorized"
                          : category.category}
                      </Title>
                      <ProgressBar
                        progress={(studentResult / category.size) * 100}
                      />
                    </Styled.ProgressContainer>
                  );
                })}
              </Styled.ProgressWrapper>
            </Card>
            <Card
              title={"Same group"}
              isEmpty={sameGroupStudents?.length === 0}
              gridName="group"
              emptyMessage={`${student?.info?.name} is alone here`}
              innerCard={isMobile}
              isLoading={!student}
            >
              <Styled.GroupContainer>
                {sameGroupStudents?.map((group) => {
                  return (
                    <Avatar
                      name={group.info?.name}
                      photo={group.info?.photo}
                      size="medium"
                      onClick={() => handleChangeStudent(group.info?.uid || "")}
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
            isLoading={!student}
          >
            {student && student?.info && (
              <Block.ProfileInfo
                student={student.info}
                openTab={openTab || ""}
              />
            )}
          </Card>
        )}
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default StudentProfile;
