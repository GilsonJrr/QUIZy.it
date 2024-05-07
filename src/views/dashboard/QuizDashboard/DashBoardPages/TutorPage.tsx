import React, { useState } from "react";
import * as Styled from "../styled";
import { TTutorResult } from "types/index";
import {
  TutorResults,
  easyQuizzes,
  hardQuizzes,
  mediumQuizzes,
  students,
} from "assets/consts";
import Table from "components/Table";
import Card from "components/Card";
import RenderTable from "components/renderItems/RenderTable";
import RenderQuizCard from "components/renderItems/RenderQuizCard";
import RenderStudentCard from "components/renderItems/RenderStudentCard";

export const TutorPage = () => {
  const [search, setSearch] = useState<string>();
  const [searchStudents, setSearchStudents] = useState<string>();
  const TableHeaderTitles = [
    { label: "Name", width: 40 },
    { label: "Quiz", width: 40 },
    { label: "Score", width: 15 },
    { label: "", width: 15 },
  ];

  const allQuizzes = [...easyQuizzes, ...mediumQuizzes, ...hardQuizzes].filter(
    (e) => e.title.toUpperCase().includes(search?.toUpperCase() || "")
  );

  const filterStudents = students.filter((e) =>
    e.Name.toUpperCase().includes(searchStudents?.toUpperCase() || "")
  );

  return (
    <Styled.Container>
      <Card
        gridName="card1"
        title="All Quizes"
        isEmpty={allQuizzes.length === 0}
        emptyMessage={
          search
            ? "Quiz not found"
            : "No new quiz available at this time. Please check later"
        }
        scrollable
        searchable
        searchValue={search}
        setSearch={(e) => setSearch(e)}
        redirectTo="Quizzes"
        redirectPath="/quizzes"
      >
        {allQuizzes?.map((item) => {
          return <RenderQuizCard item={item} editMode />;
        })}
      </Card>
      <Card
        gridName="card3"
        title="My students"
        isEmpty={filterStudents.length === 0}
        emptyMessage={
          searchStudents
            ? "Student not found"
            : "you have not registered any student so far"
        }
        scrollable
        searchable
        searchValue={searchStudents}
        setSearch={(e) => setSearchStudents(e)}
        redirectTo="Students"
        redirectPath="/students"
      >
        {filterStudents?.map((item) => {
          return <RenderStudentCard item={item} />;
        })}
      </Card>
      <Card
        gridName="card2"
        title="Last Completed Quizzes"
        isEmpty={TutorResults?.length === 0}
        emptyMessage={"you have not completed any quiz so far"}
        redirectTo="Results"
        redirectPath="/results"
      >
        <Table<TTutorResult>
          header={TableHeaderTitles}
          content={TutorResults.slice(0, 5)}
          renderItem={(item) => <RenderTable tutorResultTable={item} />}
        />
      </Card>
    </Styled.Container>
  );
};
