import React, { FC, useEffect } from "react";
import * as Styled from "./styled";
import * as Block from "blocks/studentProfile";
import BreadCrumbs from "components/BreadCrumbs";
import Card from "components/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { requestStudent, studentCleanUp } from "Store/students/actions";
import {
  useLocation,
  // useNavigate
} from "react-router-dom";
import Avatar from "components/Avatar";

type StudentProfileProps = {};

const StudentProfile: FC<StudentProfileProps> = () => {
  const { student, isLoading, students } = useSelector(
    (state: RootState) => state.studentReducer
  );
  const dispatch = useDispatch();
  const location = useLocation();
  // const navigate = useNavigate();
  const userID = localStorage.getItem("userId");

  const studentId = new URLSearchParams(location.search).get("studentId");

  const crumbs = [
    { label: "Students", path: "/students" },
    { label: "Students Profile", path: "/students/student-profile" },
  ];

  useEffect(() => {
    if (student === undefined && studentId) {
      dispatch(
        requestStudent({ uid: userID || "", studentId: studentId || "" })
      );
    }
  }, [dispatch, student, studentId, userID]);

  useEffect(() => {
    return () => {
      dispatch(studentCleanUp());
    };
  }, [dispatch]);

  if (isLoading) {
    return <>Loading...</>;
  }

  const sameGroupStudents = students?.filter((studentList) => {
    return (
      studentList.info?.group === student?.info?.group &&
      studentList.info?.name !== student?.info?.name
    );
  });

  console.log("students", sameGroupStudents);

  return (
    <Styled.Wrapper>
      <BreadCrumbs crumbs={crumbs} />
      <Styled.Container>
        <Card
          title={"All results"}
          children={undefined}
          isEmpty={false}
          gridName="results"
        ></Card>
        <Card
          title={"Categorie Result"}
          children={undefined}
          isEmpty={false}
          gridName="categories"
        ></Card>
        <Card title={"From the same group"} isEmpty={false} gridName="group">
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
