import React, { FC, useEffect, useMemo, useState } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import OptionsButton from "components/OptionsButton";
import { TOptions } from "types/index";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import RenderStudentCard from "components/renderItems/RenderStudentCard";
import Tabs from "components/Tabs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestStudentList } from "Store/students/actions";
import { RootState } from "Store/root-reducer";
import { requestGroupList } from "Store/group/actions";
import useDeviceType from "hooks/useDeviceType";

type StudentsProps = {};

const Students: FC<StudentsProps> = () => {
  const { students, isLoading } = useSelector(
    (state: RootState) => state.student
  );

  const { groups, isLoading: groupLoading } = useSelector(
    (state: RootState) => state.group
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useDeviceType();

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
    // option: "Edit group",
    // optionIcon: <FaEdit size={40} />,
    // onClick: () => navigate(randomQuiz()),
    // },
  ];
  const [tab, setTab] = useState("All");
  const [menuTab, setMenuTab] = useState("Students");

  const tabs = useMemo(() => {
    if (groups && groups.length > 0 && !groupLoading) {
      return groups.map((group) => {
        return { label: group.title };
      });
      // return [];
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
    if (groups === undefined && userID) {
      dispatch(requestGroupList({ uid: userID }));
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
            <Tabs
              tabs={[{ label: "All" }, ...tabs]}
              activeTab={(tab) => setTab(tab)}
            />
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
