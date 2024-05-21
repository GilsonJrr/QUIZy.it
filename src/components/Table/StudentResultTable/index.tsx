import React, { FC, useEffect, useMemo } from "react";
import Table from "..";
import RenderTable from "components/renderItems/RenderTable";
import { THeader, TResult } from "types/index";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";

type StudentResultTableProps = {
  dashBoard?: boolean;
  emptyState?: (empty: boolean) => void;
  studentID?: string;
  tutorView?: boolean;
};

const StudentResultTable: FC<StudentResultTableProps> = ({
  dashBoard,
  emptyState,
  studentID,
  tutorView,
}) => {
  const { quizzes } = useSelector((state: RootState) => state.quiz);

  const TableHeaderTitles: THeader[] = [
    { label: "Title", width: 50 },
    { label: "Score", width: 20 },
    { label: "Date", width: 20 },
    { label: "Option", width: 10, align: "center" },
  ];
  const results = useMemo(() => {
    const myResults = quizzes?.map((student) => ({
      results: Object.fromEntries(
        Object.entries(student.results || {})?.filter(
          ([key, value]) => key === studentID
        )
      ),
    }));
    return myResults
      ? Object.values(myResults)
          ?.map((res) => {
            return Object.values(res.results)[0]
              ? {
                  date: Object.values(res.results)[0]?.date,
                  quiz: Object.values(res.results)[0]?.quizTitle,
                  score: Object.values(res.results)[0]?.score,
                  quizId: Object.values(res.results)[0]?.quizUid,
                  amount: Object.values(res.results)[0]?.amount,
                  quizResume: Object.values(res.results)[0]?.resume,
                  studentName: Object.values(res.results)[0]?.studentName,
                }
              : undefined;
          })
          ?.filter((empty) => empty !== undefined)
          .sort((a, b) => parseInt(b?.date || "") - parseInt(a?.date || ""))
      : [];
  }, [quizzes, studentID]);

  useEffect(() => {
    emptyState?.(results.length === 0);
  }, [emptyState, results.length]);

  return (
    <Table<TResult>
      header={TableHeaderTitles}
      content={(dashBoard ? results.slice(0, 5) : results) as TResult[]}
      renderItem={(item) => <RenderTable item={item} tutorView={tutorView} />}
    />
  );
};

export default StudentResultTable;
