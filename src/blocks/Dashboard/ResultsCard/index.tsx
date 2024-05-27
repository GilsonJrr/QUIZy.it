import React, { FC, useState } from "react";
import Card from "components/Card";
import useDeviceType from "hooks/useDeviceType";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useTranslation } from "react-i18next";
import TutorResultTable from "components/Table/TutorResultTable";
import StudentResultTable from "components/Table/StudentResultTable";

type QuizzesCardProps = {
  origin?: boolean;
  gridName?: string;
};

const QuizzesCard: FC<QuizzesCardProps> = ({ origin, gridName }) => {
  const isMobile = useDeviceType();

  const { t } = useTranslation();
  const { userStudent, user } = useSelector((state: RootState) => state.user);
  const { isLoading } = useSelector((state: RootState) => state.quiz);

  const userType = user?.info?.userType || userStudent?.userType;

  const [search, setSearch] = useState<string>();
  const [filter, setFilter] = useState(true);

  return (
    <Card
      gridName={gridName}
      title={t("dashboard.results")}
      isEmpty={false}
      emptyMessage={t("dashboard.emptyResult")}
      redirectTo={origin ? "" : t("dashboard.redirectResults")}
      redirectPath={origin ? "" : "/results"}
      isLoading={isLoading}
      innerCard={isMobile}
      setOrder={(order) => setFilter(order)}
      searchable
      searchValue={search}
      setSearch={(e) => setSearch(e)}
    >
      {userType === "tutor" ? (
        <TutorResultTable search={search} filter={filter} itemKey={"name"} />
      ) : (
        <StudentResultTable
          studentID={userStudent?.uid}
          search={search}
          filter={filter}
          itemKey={"quiz"}
        />
      )}
    </Card>
  );
};

export default QuizzesCard;
