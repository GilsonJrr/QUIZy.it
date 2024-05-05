import React, { FC } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import OptionsButton from "components/OptionsButton";
import { TOptions } from "types/index";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import RenderStudentCard from "components/renderItems/RenderStudentCard";
import { students } from "assets/consts";

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

  return (
    <Styled.Container>
      <OptionsButton options={Options} width="20%" />
      <Card
        title={"Students list"}
        isEmpty={false}
        emptyMessage={"you have not registered any student so far"}
        scrollable
      >
        <Styled.MapRow>
          {students?.map((item) => {
            return <RenderStudentCard item={item} width="49%" />;
          })}
        </Styled.MapRow>
      </Card>
    </Styled.Container>
  );
};

export default Students;
