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
import {
  LoadingContainerCard,
  LoadingContainerFullPage,
} from "components/Container/styled";
import LoadingSpinner from "components/LoadingSpiner";
import { TInfo } from "Store/students/types";

type StudentsProps = {};

const Students: FC<StudentsProps> = () => {
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

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(true);

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
        return { label: group.title, color: group.color };
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

  const searchedStudents: TInfo[] =
    students && students?.length > 0
      ? filterStudents()
          ?.filter((student) =>
            student.info?.name.toUpperCase().includes(search.toUpperCase())
          )
          .map((student) => student.info)
          .filter((info): info is TInfo => info !== undefined)
          .sort((a, b) => {
            const order = a.name.localeCompare(b.name);
            return filter ? order : -order;
          }) ?? []
      : [];

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
          message={`Your student account has been successfully created. he will receive a 
                    e-mail to reset the password and be able to do the first login`}
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
      {isMobile && (
        <Styled.TabContainer>
          <Tabs
            tabs={[{ label: "Students", color: " " }, { label: "Options" }]}
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
          isLoading={isLoading || groupLoading}
          innerCard={isMobile}
          setOrder={(order) => setFilter(order)}
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
                if (item) {
                  return (
                    <RenderStudentCard
                      item={item}
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
