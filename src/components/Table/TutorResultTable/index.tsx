import React, { FC, useEffect, useMemo } from "react";
import Table from "..";
import RenderTable from "components/renderItems/RenderTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { ResultTypeValues } from "Store/result/types";
import { requestResultList } from "Store/result/actions";

type TutorResultTableProps = {
  dashBoard?: boolean;
  emptyState?: (empty: boolean) => void;
  search?: string;
  filter?: boolean;
  itemKey: string;
};

const TutorResultTable: FC<TutorResultTableProps> = ({
  dashBoard,
  emptyState,
  search,
  filter,
  itemKey,
}) => {
  const dispatch = useDispatch();

  const { results } = useSelector((state: RootState) => state.result);
  const { user } = useSelector((state: RootState) => state.user);

  const TableHeaderTitles = [
    { label: "Name", width: 40 },
    { label: "Quiz", width: 40 },
    { label: "Score", width: 15 },
    { label: "", width: 15 },
  ];

  const tutorResults = useMemo(() => {
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
    emptyState?.(tutorResults.length === 0);
  }, [emptyState, tutorResults.length]);

  useEffect(() => {
    if (results === undefined) {
      dispatch(
        requestResultList({
          uid: user?.info?.uid || "",
        })
      );
    }
  }, [dispatch, user, results]);

  return (
    <Table<ResultTypeValues>
      header={TableHeaderTitles}
      content={tutorResults}
      renderItem={(item) => <RenderTable tutorResultTable={item} />}
    />
  );
};

export default TutorResultTable;
