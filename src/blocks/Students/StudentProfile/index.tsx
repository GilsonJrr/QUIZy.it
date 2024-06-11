import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import * as Block from "blocks/studentProfile";
import Card from "components/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { requestStudent } from "Store/students/actions";
import Avatar from "components/Avatar";
import { requestResultList } from "Store/result/actions";
import LoadingSpinner from "components/LoadingSpiner";
import { LoadingContainerFullPage } from "components/Container/styled";
import { requestQuizList } from "Store/quiz/actions";
import Tabs from "components/Tabs";
import useDeviceType from "hooks/useDeviceType";
import StudentResultTable from "components/Table/StudentResultTable";

type StudentProfileProps = { onEditClick: () => void };

const StudentProfile: FC<StudentProfileProps> = ({ onEditClick }) => {
  const {
    student,
    isLoading: studentLoading,
    students,
  } = useSelector((state: RootState) => state.student);
  const { quizzes, isLoading: quizLoading } = useSelector(
    (state: RootState) => state.quiz
  );
  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const isMobile = useDeviceType();

  const [tab, setTab] = useState("Info");
  const [resultTab, setResultTab] = useState("Results");

  // useEffect(() => {
  //   if (!student) {
  //     dispatch(
  //       requestStudent({
  //         uid: user?.info?.uid || "",
  //         studentId: studentId || "",
  //       })
  //     );
  //   }
  // }, [dispatch, student, studentId, user]);

  useEffect(() => {
    if (quizzes === undefined) {
      dispatch(
        requestResultList({
          uid: user?.info?.uid || "",
          studentUid: student?.info?.uid || "",
        })
      );
    }
  }, [dispatch, quizzes, student, user]);

  useEffect(() => {
    if (quizzes === undefined) {
      dispatch(requestQuizList({ uid: user?.info?.uid || "" }));
    }
  }, [dispatch, quizzes, user]);

  const sameGroupStudents = students?.filter((studentList) => {
    return (
      studentList.info?.group === student?.info?.group &&
      studentList.info?.name !== student?.info?.name
    );
  });

  const handleChangeStudent = (uid: string) => {
    // navigate(`/students/student-profile?studentId=${uid}`);
    dispatch(requestStudent({ uid: user?.info?.uid || "", studentId: uid }));
  };

  if (studentLoading || quizLoading) {
    return (
      <LoadingContainerFullPage>
        <LoadingSpinner size="big" />
      </LoadingContainerFullPage>
    );
  }

  console.log("studentID", student?.info?.uid);

  return (
    <Styled.Wrapper>
      {isMobile && (
        <Tabs
          tabs={[{ label: "Info" }, { label: "More" }]}
          activeTab={(tab) => setTab(tab)}
          radius={10}
          wrap
        />
      )}
      <Styled.Container>
        {(!isMobile || tab === "More") && (
          <Card
            title={""}
            gridName="results"
            isEmpty={false}
            emptyMessage={`${student?.info?.name} has't completed any quiz yet`}
            innerCard={isMobile}
          >
            <Tabs
              tabs={[{ label: "Results" }]}
              activeTab={(tab) => setResultTab(tab)}
              radius={10}
            />
            {resultTab === "Results" && (
              <StudentResultTable
                studentID={student?.info?.uid || ""}
                tutorView
                itemKey="quizTitle"
              />
            )}
          </Card>
        )}
        {/* TODO: reativar aqui apos decidir a melhor forma de salvar esses resultados */}
        {/* {(!isMobile || tab === "Category") && (
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
        )} */}
        {!isMobile && (
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
              <Block.ProfileInfo student={student.info} onClick={onEditClick} />
            )}
          </Card>
        )}
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default StudentProfile;
