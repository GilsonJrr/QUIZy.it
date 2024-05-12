import React, { FC, useEffect } from "react";
import * as Styled from "./styled";
import * as Block from "blocks/studentProfile";
import BreadCrumbs from "components/BreadCrumbs";
import Card from "components/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { requestStudent } from "Store/students/actions";
import { useLocation } from "react-router-dom";
import Avatar from "components/Avatar";

type StudentProfileProps = {};

const StudentProfile: FC<StudentProfileProps> = () => {
  const { student, isLoading, students } = useSelector(
    (state: RootState) => state.studentReducer
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const userID = localStorage.getItem("userId");

  const studentId = new URLSearchParams(location.search).get("studentId");

  const crumbs = [
    { label: "Students", path: "/students" },
    { label: "Students Profile", path: "/students/student-profile" },
  ];

  useEffect(() => {
    if (studentId) {
      dispatch(
        requestStudent({ uid: userID || "", studentId: studentId || "" })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <Styled.Wrapper>
      <BreadCrumbs crumbs={crumbs} />
      <Styled.Container>
        <Card
          title={"All results"}
          children={undefined}
          gridName="results"
          isEmpty={true}
          emptyMessage={`${student?.info?.name} has't completed any quiz yet`}
        ></Card>
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
