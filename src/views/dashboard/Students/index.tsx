import React, { FC, useEffect, useState } from "react";
import * as Styled from "./styled";
import Card from "components/Card";
import OptionsButton from "components/OptionsButton";
import { TOptions } from "types/index";
import { IoMdAddCircleOutline } from "react-icons/io";
// import { FaEdit } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import RenderStudentCard from "components/renderItems/RenderStudentCard";
// import { students } from "assets/consts";
import Tabs from "components/Tabs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestStudentList } from "Store/students/actions";
import { RootState } from "Store/root-reducer";

type StudentsProps = {};

const Students: FC<StudentsProps> = () => {
  const { students, isLoading } = useSelector(
    (state: RootState) => state.studentReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = "f76fd8s7f78sdf";

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

  const tabs = [
    { label: "All" },
    { label: "Level 01" },
    { label: "Level 02" },
    { label: "Level 03" },
  ];

  const filterStudents = () => {
    switch (true) {
      case tab === "All":
        return students;
      default:
        return students?.filter((student) => student.group === tab);
    }
  };

  const searchedStudents = filterStudents()?.filter((student) =>
    student.name.toUpperCase().includes(search.toUpperCase())
  );

  useEffect(() => {
    if (students === undefined) {
      dispatch(requestStudentList({ uid: userID }));
    }
  }, [dispatch, students]);

  if (isLoading) {
    return <>Loading...</>;
  }

  console.log("students", students);

  return (
    <Styled.Container>
      <OptionsButton options={Options} width="20%" />
      <Card
        title={"Students list"}
        isEmpty={students?.length === 0}
        emptyMessage={
          search
            ? "Student not found"
            : "you have not registered any student so far"
        }
        searchable
        searchValue={search}
        setSearch={(e) => setSearch(e)}
      >
        <Styled.CardInner>
          <Tabs tabs={tabs} activeTab={(tab) => setTab(tab)} />
          <Styled.MapRow>
            {searchedStudents?.map((item) => {
              return (
                <RenderStudentCard
                  item={item}
                  width="49%"
                  onClick={() =>
                    navigate(`/students/student-profile?studentId=${item.id}`)
                  }
                />
              );
            })}
          </Styled.MapRow>
        </Styled.CardInner>
      </Card>
    </Styled.Container>
  );
};

export default Students;
