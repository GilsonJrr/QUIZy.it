import React, { FC } from "react";
import * as Styled from "./styled";
import BreadCrumbs from "components/BreadCrumbs";
import Card from "components/Card";

type StudentProfileProps = {};

const StudentProfile: FC<StudentProfileProps> = () => {
  const crumbs = [
    { label: "Students", path: "/students" },
    { label: "Students Profile", path: "/students/student-profile" },
  ];

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
        <Card
          title={"From the same group"}
          children={undefined}
          isEmpty={false}
          gridName="group"
        ></Card>
        <Card
          title={""}
          children={undefined}
          isEmpty={false}
          gridName="information"
        ></Card>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default StudentProfile;
