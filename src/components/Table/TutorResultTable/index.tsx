import React, { FC, useEffect, useMemo } from "react";
import Table from "..";
import RenderTable from "components/renderItems/RenderTable";
import { TTutorResult } from "types/index";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";

type TutorResultTableProps = {
  dashBoard?: boolean;
  emptyState?: (empty: boolean) => void;
};

const TutorResultTable: FC<TutorResultTableProps> = ({
  dashBoard,
  emptyState,
}) => {
  const { students } = useSelector((state: RootState) => state.studentReducer);

  const TableHeaderTitles = [
    { label: "Name", width: 40 },
    { label: "Quiz", width: 40 },
    { label: "Score", width: 15 },
    { label: "", width: 15 },
  ];

  const tutorResults = useMemo(() => {
    return students
      ? students
          // eslint-disable-next-line array-callback-return
          ?.map((item) => {
            const student = item.info;
            const results = item.results;
            if (results) {
              return Object.values(results).map((result) => ({
                name: student?.name || "",
                quiz: result.quizTitle || "",
                score: `${result.score} / ${result.amount}` || "",
                extraInfo: result,
              }));
            }
          })
          .flat()
          .filter((u) => u !== undefined)
      : [];
  }, [students]);

  useEffect(() => {
    emptyState?.(tutorResults.length === 0);
  }, [emptyState, tutorResults.length]);

  return (
    <Table<TTutorResult>
      header={TableHeaderTitles}
      content={
        (dashBoard ? tutorResults.slice(0, 5) : tutorResults) as TTutorResult[]
      }
      renderItem={(item) => <RenderTable tutorResultTable={item} />}
    />
  );
};

export default TutorResultTable;
