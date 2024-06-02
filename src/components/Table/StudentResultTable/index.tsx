import React, { FC, useEffect, useMemo } from "react";
import Table from "..";
import RenderTable from "components/renderItems/RenderTable";
import { THeader } from "types/index";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { ResultTypeValues } from "Store/result/types";
import { useDispatch } from "react-redux";
import { requestResultList, resultListCleanUp } from "Store/result/actions";

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
  const dispatch = useDispatch();

  const { results } = useSelector((state: RootState) => state.result);
  const { user, userStudent } = useSelector((state: RootState) => state.user);

  const TableHeaderTitles: THeader[] = [
    { label: "Title", width: 50 },
    { label: "Score", width: 15 },
    { label: "Date", width: 20 },
    { label: "Option", width: 15, align: "center" },
  ];

  const studentResults = useMemo(() => {
    return (
      results
        ?.filter((e) =>
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
        }) || []
    );
  }, [filter, itemKey, results, search]);

  useEffect(() => {
    dispatch(
      requestResultList({
        uid: user?.info?.uid || userStudent?.tutorID || "",
        studentUid: studentID || "",
      })
    );
  }, [dispatch, user, userStudent, studentID]);

  useEffect(() => {
    return () => {
      dispatch(resultListCleanUp());
    };
  }, [dispatch]);

  return (
    <Table<ResultTypeValues>
      header={TableHeaderTitles}
      content={studentResults}
      renderItem={(item) => <RenderTable item={item} tutorView={tutorView} />}
    />
  );
};

export default StudentResultTable;
