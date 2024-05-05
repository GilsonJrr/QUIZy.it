import React, { FC, useState } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import OptionsButton from "components/OptionsButton";
import { TOptions } from "types/index";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import RenderStudentCard from "components/renderItems/RenderStudentCard";
import { students } from "assets/consts";
import Tabs from "components/Tabs";

type StudentsProps = {};

const Students: FC<StudentsProps> = () => {
  const Options: TOptions[] = [
    {
      option: "Add student",
      optionIcon: <FaUserEdit size={40} />,
      // onClick: () => navigate(randomQuiz()),
    },
    {
      option: "Add group",
      optionIcon: <IoMdAddCircleOutline size={40} />,
      // onClick: () => navigate(randomQuiz()),
    },
    {
      option: "Edit group",
      optionIcon: <FaEdit size={40} />,
      // onClick: () => navigate(randomQuiz()),
    },
  ];
  const [tab, setTab] = useState("All");

  const tabs = [
    { label: "All" },
    { label: "Level 01" },
    { label: "Level 02" },
    { label: "Level 03" },
  ];

  const filterStudents = () => {
    switch (true) {
      case tab === "All":
        return students;
      default:
        return students.filter((student) => student.Group === tab);
    }
  };

  return (
    <Styled.Container>
      <OptionsButton options={Options} width="20%" />
      <Card
        title={"Students list"}
        isEmpty={false}
        emptyMessage={"you have not registered any student so far"}
      >
        <Styled.CardInner>
          <Tabs tabs={tabs} activeTab={(tab) => setTab(tab)} />
          <Styled.MapRow>
            {filterStudents()?.map((item) => {
              return <RenderStudentCard item={item} width="49%" />;
            })}
          </Styled.MapRow>
        </Styled.CardInner>
      </Card>
    </Styled.Container>
  );
};

export default Students;
