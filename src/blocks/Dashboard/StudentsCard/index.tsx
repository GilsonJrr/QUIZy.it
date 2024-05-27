import React, { FC, useState } from "react";
import Card from "components/Card";
import useDeviceType from "hooks/useDeviceType";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useTranslation } from "react-i18next";
import List from "components/List";
import RenderStudentCard from "components/renderItems/RenderStudentCard";
import { TInfo } from "Store/students/types";

type StudentsCardProps = { gridName?: string };

const StudentsCard: FC<StudentsCardProps> = ({ gridName }) => {
  const isMobile = useDeviceType();

  const { t } = useTranslation();
  const { students, isLoading } = useSelector(
    (state: RootState) => state.student
  );

  const filterStudents: TInfo[] =
    students
      ?.map((e) => e?.info)
      .filter((info): info is TInfo => info !== undefined) ?? [];

  const [search, setSearch] = useState<string>();
  const [student, setStudent] = useState(true);

  return (
    <Card
      gridName={gridName}
      title={t("dashboard.students")}
      isEmpty={filterStudents?.length === 0}
      emptyMessage={t("dashboard.emptyNoStudent")}
      scrollable
      searchable
      searchValue={search}
      setSearch={(e) => setSearch(e)}
      redirectTo={t("dashboard.redirectStudents")}
      redirectPath="/students"
      isLoading={isLoading}
      innerCard={isMobile}
      setOrder={(order) => setStudent(order)}
    >
      <List<TInfo>
        content={filterStudents ?? []}
        renderItem={(item) => <RenderStudentCard item={item} />}
        search={search}
        itemKey={"name"}
        filter={student}
        emptyState={t("dashboard.emptyStudent")}
      />
    </Card>
  );
};

export default StudentsCard;
