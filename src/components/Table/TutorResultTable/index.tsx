import React, { FC, useEffect, useMemo } from "react";
import Table from "..";
import RenderTable from "components/renderItems/RenderTable";
import { TTutorResult } from "types/index";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";

type TutorResultTableProps = {
  dashBoard?: boolean;
  emptyState?: (empty: boolean) => void;
  search?: string;
  filter?: boolean;
  itemKey?: string;
};

const TutorResultTable: FC<TutorResultTableProps> = ({
  dashBoard,
  emptyState,
  search,
  filter,
  itemKey,
}) => {
  const { quizzes } = useSelector((state: RootState) => state.quiz);

  const TableHeaderTitles = [
    { label: "Name", width: 40 },
    { label: "Quiz", width: 40 },
    { label: "Score", width: 15 },
    { label: "", width: 15 },
  ];

  const tutorResults = useMemo(() => {
    const myResults = quizzes?.map((quiz) => ({
      results: quiz.results,
    }));
    return myResults
      ? Object.values(myResults)
          ?.map((res) => {
            return Object.values(res.results || "")?.map((innerQuiz) => {
              return {
                name: innerQuiz?.studentName || "",
                quiz: innerQuiz.quizTitle || "",
                score: innerQuiz.score,
                amount: innerQuiz.amount,
                extraInfo: innerQuiz,
                studentName: innerQuiz?.studentName,
                date: innerQuiz.date,
              };
            });
          })
          .flatMap((innerArray) => innerArray)
          .sort((a, b) => parseInt(b?.date || "") - parseInt(a?.date || ""))
          .filter((e) =>
            (e as Record<string, string>)[itemKey || ""]
              ?.toUpperCase()
              .includes(search?.toUpperCase() || "")
          )
          .sort((a, b) => {
            const comparison = (a as Record<string, string>)[
              itemKey || ""
            ].localeCompare((b as Record<string, string>)[itemKey || ""]);
            return filter ? comparison : -comparison;
          })
      : [];
  }, [filter, itemKey, quizzes, search]);

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
