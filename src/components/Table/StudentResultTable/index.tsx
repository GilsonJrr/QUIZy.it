import React, { FC, useMemo } from "react";
import Table from "..";
import RenderTable from "components/renderItems/RenderTable";
import { THeader, TResult } from "types/index";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";

type StudentResultTableProps = {
  dashBoard?: boolean;
  studentID?: string;
  tutorView?: boolean;
  search?: string;
  filter?: boolean;
  itemKey: string;
};

const StudentResultTable: FC<StudentResultTableProps> = ({
  dashBoard,
  studentID,
  tutorView,
  search,
  filter,
  itemKey,
}) => {
  const { quizzes } = useSelector((state: RootState) => state.quiz);

  const TableHeaderTitles: THeader[] = [
    { label: "Title", width: 50 },
    { label: "Score", width: 15 },
    { label: "Date", width: 20 },
    { label: "Option", width: 15, align: "center" },
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
                  extraInfo: Object.values(res.results)[0],
                }
              : undefined;
          })
          ?.filter((empty) => empty !== undefined)
          .sort((a, b) => parseInt(b?.date || "") - parseInt(a?.date || ""))
          .filter((e) =>
            (e as unknown as Record<string, string>)[itemKey || ""]
              ?.toUpperCase()
              .includes(search?.toUpperCase() || "")
          )
          .sort((a, b) => {
            const comparison = (a as unknown as Record<string, string>)[
              itemKey || ""
            ].localeCompare(
              (b as unknown as Record<string, string>)[itemKey || ""]
            );
            return filter ? comparison : -comparison;
          })
      : [];
  }, [filter, itemKey, quizzes, search, studentID]);

  console.log("results", results);

  return (
    <Table<TResult>
      header={TableHeaderTitles}
      content={(dashBoard ? results.slice(0, 5) : results) as TResult[]}
      renderItem={(item) => <RenderTable item={item} tutorView={tutorView} />}
    />
  );
};

export default StudentResultTable;
