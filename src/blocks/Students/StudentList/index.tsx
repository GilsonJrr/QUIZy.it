import React, { FC, useEffect, useMemo, useState } from "react";
import * as Styled from "./styled";
import RenderStudentCard from "components/renderItems/RenderStudentCard";
import Tabs from "components/Tabs";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestStudentList } from "Store/students/actions";
import { RootState } from "Store/root-reducer";
import { requestGroupList } from "Store/group/actions";
import useDeviceType from "hooks/useDeviceType";
import AlertModal from "components/Modal/AlertModal";
import { useModalContext } from "components/Modal/modalContext";
import {
  LoadingContainerCard,
  LoadingContainerFullPage,
} from "components/Container/styled";
import LoadingSpinner from "components/LoadingSpiner";
import { TInfo } from "Store/students/types";
import { useTranslation } from "react-i18next";
import SearchInput from "components/inputs/SearchInput";
import AlphabeticalFilter from "components/AlphabeticalFilter";
import ModalTemplate from "components/Modal/ModalTemplate";

type StudentsProps = {
  onClick: () => void;
};

const Students: FC<StudentsProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const { isLoading: userLoading } = useSelector(
    (state: RootState) => state.user
  );
  const { isLoading: authLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const { students, isLoading } = useSelector(
    (state: RootState) => state.student
  );
  const { groups, isLoading: groupLoading } = useSelector(
    (state: RootState) => state.group
  );
  const { user } = useSelector((state: RootState) => state.user);

  const { handleModal } = useModalContext();

  const dispatch = useDispatch();
  const isMobile = useDeviceType();
  const location = useLocation();

  const [tab, setTab] = useState(t("students.tab1"));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(true);

  const newStudentCreated = new URLSearchParams(location.search).get(
    "newStudentCreated"
  );
  const studentsQuantity = new URLSearchParams(location.search).get(
    "studentsQuantity"
  );

  const userID = user?.info?.uid;

  const tabs = useMemo(() => {
    if (groups && groups.length > 0 && !groupLoading) {
      return groups.map((group) => {
        return { label: group.title, color: group.color };
      });
    } else {
      return [];
    }
  }, [groupLoading, groups]);

  const filterStudents = () => {
    switch (true) {
      case tab === t("students.tab1"):
        return students;
      default:
        return students?.filter((student) => student?.info?.group === tab);
    }
  };

  const searchedStudents: TInfo[] =
    students && students?.length > 0
      ? filterStudents()
          ?.filter((student) =>
            student.info?.name?.toUpperCase().includes(search?.toUpperCase())
          )
          .map((student) => student.info)
          .filter((info): info is TInfo => info !== undefined)
          .sort((a, b) => {
            const order = a.name.localeCompare(b.name);
            return filter ? order : -order;
          }) ?? []
      : [];

  const handleOpenFilterModal = () => {
    handleModal(
      <ModalTemplate>
        <Styled.TabContainer>
          <Tabs
            tabs={[{ label: t("students.tab1"), color: "" }, ...tabs]}
            activeTab={(tab) => setTab(tab)}
            wrap
          />
        </Styled.TabContainer>
      </ModalTemplate>
    );
  };

  useEffect(() => {
    if (groups === undefined) {
      dispatch(requestGroupList({ uid: userID || "" }));
    }
  }, [dispatch, groups, userID]);

  useEffect(() => {
    if (students === undefined && userID) {
      dispatch(requestStudentList({ uid: userID }));
    }
  }, [dispatch, students, userID]);

  useEffect(() => {
    if (
      students &&
      newStudentCreated &&
      parseInt(studentsQuantity || "") < students.length
    ) {
      handleModal(
        <AlertModal
          type={"success"}
          message={t("students.modalMessage")}
          totalTime={7000}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newStudentCreated, students, studentsQuantity]);

  if (isLoading || authLoading || userLoading) {
    return (
      <LoadingContainerFullPage>
        <LoadingSpinner size="big" />
      </LoadingContainerFullPage>
    );
  }

  return (
    <Styled.CardInner>
      {!groupLoading ? (
        <Styled.SearchContainer>
          <AlphabeticalFilter aT0Z={(order) => setFilter?.(order)} />
          <SearchInput
            value={search}
            setValue={(search) => setSearch(search)}
            width="100%"
          />
          {!isMobile && (
            <Tabs
              onClick={handleOpenFilterModal}
              tabs={
                tabs.filter((t) => t.label === tab).length === 0
                  ? [
                      {
                        label: t("students.tab1") || "",
                        color: "",
                      },
                    ]
                  : tabs.filter((t) => t.label === tab)
              }
              activeTab={(tab) => setTab(tab)}
            />
          )}
        </Styled.SearchContainer>
      ) : (
        <LoadingContainerCard>
          <LoadingSpinner size="medium" />
        </LoadingContainerCard>
      )}

      <Styled.MapRow>
        {searchedStudents?.map((item) => {
          if (item) {
            return (
              <RenderStudentCard
                item={item}
                width={isMobile ? "100%" : "49%"}
                onClick={onClick}
              />
            );
          }

          return null;
        })}
      </Styled.MapRow>
    </Styled.CardInner>
  );
};

export default Students;
