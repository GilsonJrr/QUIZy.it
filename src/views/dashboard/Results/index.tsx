import React, { FC, useMemo } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import Table from "components/Table";
import { THeader, TResult, TTutorResult } from "types/index";
import RenderTable from "components/renderItems/RenderTable";
import { TutorResults, userType } from "assets/consts";

type ResultsProps = {};

const Results: FC<ResultsProps> = () => {
  const TableHeaderTitles: THeader[] = [
    { label: "Title", width: 50 },
    { label: "Score", width: 20 },
    { label: "Date", width: 20 },
    { label: "Option", width: 10, align: "center" },
  ];

  const TableHeaderTutorTitles = [
    { label: "Name", width: 40 },
    { label: "Quiz", width: 40 },
    { label: "Score", width: 15 },
    { label: "", width: 15 },
  ];

  const results = useMemo(() => {
    const resultStorage = localStorage.getItem("netQuiz_my_results");
    return resultStorage ? JSON.parse(resultStorage).reverse() : [];
  }, []);

  return (
    <Styled.Container>
      <Card
        title="Completed Quizzes"
        isEmpty={results.length === 0}
        emptyMessage={"you have not completed any quiz so far"}
      >
        {userType === "tutor" ? (
          <Table<TTutorResult>
            header={TableHeaderTutorTitles}
            content={TutorResults}
            renderItem={(item) => <RenderTable tutorResultTable={item} />}
          />
        ) : (
          <Table<TResult>
            header={TableHeaderTitles}
            content={results}
            renderItem={(item) => <RenderTable item={item} />}
          />
        )}
      </Card>
    </Styled.Container>
  );
};

export default Results;
