import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import CardTab from "components/CardTab";
import { TOptions } from "types/index";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestStudentList } from "Store/students/actions";
import { RootState } from "Store/root-reducer";
import { requestGroupList } from "Store/group/actions";
import useDeviceType from "hooks/useDeviceType";
import AlertModal from "components/Modal/AlertModal";
import { useModalContext } from "components/Modal/modalContext";
import { LoadingContainerFullPage } from "components/Container/styled";
import LoadingSpinner from "components/LoadingSpiner";
import { useTranslation } from "react-i18next";
import * as Blocks from "blocks/Students";

type StudentsProps = {};

const Students: FC<StudentsProps> = () => {
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
  const navigate = useNavigate();
  const isMobile = useDeviceType();
  const location = useLocation();

  const newStudentCreated = new URLSearchParams(location.search).get(
    "newStudentCreated"
  );
  const studentsQuantity = new URLSearchParams(location.search).get(
    "studentsQuantity"
  );

  const userID = user?.info?.uid;

  const [cardTab, setCardTab] = useState(t("students.title"));

  const Options: TOptions[] = [
    {
      option: t("students.title"),
      active: cardTab === t("students.title"),
      onClick: () => {
        setCardTab(t("students.title"));
        navigate(`/students`);
      },
    },
    {
      option: t("students.option1"),
      active: cardTab === t("students.option1"),
      onClick: () => {
        setCardTab(t("students.option1"));
        navigate(`/students`);
      },
    },
    {
      option: t("students.option2"),
      active: cardTab === t("students.option2"),
      onClick: () => {
        setCardTab(t("students.option2"));
        navigate(`/students`);
      },
    },
    {
      option: "Profile",
      active: cardTab === "Profile",
      displayOnActive: true,
    },
  ];

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
    <Styled.Container>
      <CardTab
        isEmpty={students?.length === 0}
        isLoading={isLoading || groupLoading}
        innerCard={isMobile}
        options={Options}
      >
        {cardTab === t("students.title") && (
          <Blocks.StudentList onClick={() => setCardTab("Profile")} />
        )}
        {cardTab === t("students.option1") && (
          <Blocks.StudentCreate
            onClick={() => setCardTab(t("students.title"))}
          />
        )}
        {cardTab === t("students.option2") && (
          <Blocks.GroupCreate onClick={() => setCardTab(t("students.title"))} />
        )}
        {cardTab === "Profile" && (
          <Blocks.StudentProfile
            onEditClick={() => setCardTab(t("students.option1"))}
          />
        )}
      </CardTab>
    </Styled.Container>
  );
};

export default Students;
