import React, { FC, useEffect, useMemo, useState } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import OptionsButton from "components/OptionsButton";
import { TOptions } from "types/index";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import RenderStudentCard from "components/renderItems/RenderStudentCard";
import Tabs from "components/Tabs";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestStudentList } from "Store/students/actions";
import { RootState } from "Store/root-reducer";
import { requestGroupList } from "Store/group/actions";
import useDeviceType from "hooks/useDeviceType";
import AlertModal from "components/Modal/AlertModal";
import { useModalContext } from "components/Modal/modalContext";
import { LoadingContainerCard } from "components/Container/styled";
import LoadingSpinner from "components/LoadingSpiner";

type StudentsProps = {};

const Students: FC<StudentsProps> = () => {
  const { students, isLoading } = useSelector(
    (state: RootState) => state.student
  );

  const { groups, isLoading: groupLoading } = useSelector(
    (state: RootState) => state.group
  );

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

  useEffect(() => {
    if (
      students &&
      newStudentCreated &&
      parseInt(studentsQuantity || "") < students.length
    ) {
      handleModal(
        <AlertModal
          type={"success"}
          message={`Your student account has been successfully created. he will receive a 
                    e-mail to reset the password and be able to do the first login`}
          totalTime={7000}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newStudentCreated, students, studentsQuantity]);

  const userID = localStorage.getItem("userId") || "";

  const [search, setSearch] = useState("");

  const Options: TOptions[] = [
    {
      option: "Add student",
      optionIcon: <FaUserEdit size={40} />,
      onClick: () => navigate("/students/student-create"),
    },
    {
      option: "Add group",
      optionIcon: <IoMdAddCircleOutline size={40} />,
      onClick: () => navigate("/students/group-create"),
    },
    // {
    //   option: "Edit group",
    //   optionIcon: <FaEdit size={40} />,
    //   onClick: () => navigate(randomQuiz()),
    // },
  ];
  const [tab, setTab] = useState("All");
  const [menuTab, setMenuTab] = useState("Students");

  const tabs = useMemo(() => {
    if (groups && groups.length > 0 && !groupLoading) {
      return groups.map((group) => {
        return { label: group.title };
      });
    } else {
      return [];
    }
  }, [groupLoading, groups]);

  const filterStudents = () => {
    switch (true) {
      case tab === "All":
        return students;
      default:
        return students?.filter((student) => student?.info?.group === tab);
    }
  };

  const searchedStudents =
    students && students?.length > 0
      ? filterStudents()?.filter((student) =>
          student.info?.name.toUpperCase().includes(search.toUpperCase())
        )
      : [];

  useEffect(() => {
    if (students === undefined && userID) {
      dispatch(requestStudentList({ uid: userID }));
    }
  }, [dispatch, students, userID]);

  useEffect(() => {
    if (groups === undefined) {
      dispatch(requestGroupList({ uid: userID || "" }));
    }
  }, [dispatch, groups, userID]);

  return (
    <Styled.Container>
      {isMobile && (
        <Styled.TabContainer>
          <Tabs
            tabs={[{ label: "Students" }, { label: "Options" }]}
            activeTab={(tab) => setMenuTab(tab)}
            radius={5}
          />
        </Styled.TabContainer>
      )}
      {(!isMobile || menuTab === "Options") && (
        <OptionsButton options={Options} width="20%" />
      )}
      {(!isMobile || menuTab === "Students") && (
        <Card
          title={isMobile ? "" : "Students list"}
          isEmpty={students?.length === 0}
          emptyMessage={
            search
              ? "Student not found"
              : "you have not registered any student so far"
          }
          searchable
          searchValue={search}
          setSearch={(e) => setSearch(e)}
          isLoading={isLoading || groupLoading}
          innerCard={isMobile}
        >
          <Styled.CardInner>
            {!groupLoading ? (
              <Tabs
                tabs={[{ label: "All" }, ...tabs]}
                activeTab={(tab) => setTab(tab)}
              />
            ) : (
              <LoadingContainerCard>
                <LoadingSpinner size="medium" />
              </LoadingContainerCard>
            )}
            <Styled.MapRow>
              {searchedStudents?.map((item) => {
                if (item.info) {
                  return (
                    <RenderStudentCard
                      item={item.info}
                      width={isMobile ? "100%" : "49%"}
                    />
                  );
                }

                return null;
              })}
            </Styled.MapRow>
          </Styled.CardInner>
        </Card>
      )}
    </Styled.Container>
  );
};

export default Students;
