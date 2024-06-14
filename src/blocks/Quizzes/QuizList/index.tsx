import React, { FC, useEffect, useMemo, useState } from "react";
import * as Styled from "./styled";
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
import { useTranslation } from "react-i18next";
import SearchInput from "components/inputs/SearchInput";
import AlphabeticalFilter from "components/AlphabeticalFilter";
import ModalTemplate from "components/Modal/ModalTemplate";
import RenderQuizCard from "components/renderItems/RenderQuizCard";

type QuizListProps = {
  onClick?: () => void;
  userType?: string;
};

const QuizList: FC<QuizListProps> = ({ onClick, userType }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isLoading: userLoading } = useSelector(
    (state: RootState) => state.user
  );
  const { isLoading: authLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const { quizzes, isLoading } = useSelector((state: RootState) => state.quiz);
  const { categories, isLoading: categoryLoading } = useSelector(
    (state: RootState) => state.category
  );

  // const { groups, isLoading: categoryLoading } = useSelector(
  //   (state: RootState) => state.group
  // );
  const { user } = useSelector((state: RootState) => state.user);

  const { handleModal } = useModalContext();

  const dispatch = useDispatch();
  const isMobile = useDeviceType();
  const location = useLocation();

  const [tab, setTab] = useState(t("quizzes.categories"));
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
    if (categories && categories.length > 0 && !categoryLoading) {
      return categories.map((category) => {
        return { label: category.title, color: category.color };
      });
    } else {
      return [];
    }
  }, [categoryLoading, categories]);

  const filterStudents = () => {
    switch (true) {
      case tab === t("quizzes.categories"):
        return quizzes;
      default:
        return quizzes?.filter((student) => student?.category === tab);
    }
  };

  const searchedStudents =
    quizzes && quizzes?.length > 0
      ? filterStudents()
          ?.filter((student) =>
            student.title?.toUpperCase().includes(search?.toUpperCase())
          )
          .map((student) => student)
          .filter((info) => info !== undefined)
          .sort((a, b) => {
            const order = a.title.localeCompare(b.title);
            return filter ? order : -order;
          }) ?? []
      : [];

  const handleOpenFilterModal = () => {
    handleModal(
      <ModalTemplate>
        <Styled.TabContainer>
          <Tabs
            tabs={[{ label: t("quizzes.categories"), color: "" }, ...tabs]}
            activeTab={(tab) => setTab(tab)}
            wrap
          />
        </Styled.TabContainer>
      </ModalTemplate>
    );
  };

  useEffect(() => {
    if (categories === undefined) {
      dispatch(requestGroupList({ uid: userID || "" }));
    }
  }, [dispatch, categories, userID]);

  useEffect(() => {
    if (quizzes === undefined) {
      dispatch(requestStudentList({ uid: userID || "" }));
    }
  }, [dispatch, quizzes, userID]);

  useEffect(() => {
    if (
      quizzes &&
      newStudentCreated &&
      parseInt(studentsQuantity || "") < quizzes.length
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
  }, [newStudentCreated, quizzes, studentsQuantity]);

  if (isLoading || authLoading || userLoading) {
    return (
      <LoadingContainerFullPage>
        <LoadingSpinner size="big" />
      </LoadingContainerFullPage>
    );
  }

  return (
    <Styled.CardInner>
      {!categoryLoading ? (
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
                        label: t("quizzes.categories") || "",
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
              <Styled.MapRowInner>
                <RenderQuizCard
                  item={item}
                  editMode={userType === "tutor"}
                  // width={isMobile ? "100%" : "49%"}
                  onClick={() => {
                    onClick?.();
                    navigate(`/quizzes?quizId=${item.id}`);
                  }}
                />
              </Styled.MapRowInner>
            );
          }

          return null;
        })}
      </Styled.MapRow>
    </Styled.CardInner>
  );
};

export default QuizList;
