import React, { FC, useMemo } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import Table from "components/Table";
import { TResult } from "types/index";
import RenderTable from "components/renderItems/RenderTable";

type ResultsProps = {};

const Results: FC<ResultsProps> = () => {
  const TableHeaderTitles = [
    { label: "Title", width: 50 },
    { label: "Score", width: 25 },
    { label: "Date", width: 25 },
  ];

  const results = useMemo(() => {
    const resultStorage = localStorage.getItem("netQuiz_my_results");
    return resultStorage ? JSON.parse(resultStorage) : [];
  }, []);

  return (
    <Styled.Container>
      <Card
        title="Completed Quizzes"
        isEmpty={results.length === 0}
        emptyMessage={"you have not completed any quiz so far"}
      >
        <Table<TResult>
          header={TableHeaderTitles}
          content={results}
          renderItem={(item) => <RenderTable item={item} />}
        />
      </Card>
    </Styled.Container>
  );
};

export default Results;
