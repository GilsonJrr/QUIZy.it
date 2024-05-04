import React, { FC } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import Table from "components/Table";
import OptionsButton from "components/OptionsButton";
import { TOptions } from "types/index";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";

type StudentsProps = {};

const Students: FC<StudentsProps> = () => {
  const TableHeaderTitles = [
    { label: "Name", width: 30 },
    { label: "Group", width: 20 },
    { label: "Last Score", width: 20 },
    { label: "Email", width: 20 },
    { label: "Option", width: 10 },
  ];

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
      >
        <Table
          header={TableHeaderTitles}
          content={[]}
          renderItem={function (item: unknown): React.ReactNode {
            throw new Error("Function not implemented.");
          }}
        />
      </Card>
    </Styled.Container>
  );
};

export default Students;
