import React, { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Styled from "./styled";
import BreadCrumbs from "components/BreadCrumbs";
import Card from "components/Card";
import SimpleInput from "components/inputs/SimpleInput";
import TextAreaInput from "components/inputs/TextAreaInput";
import { CategoryCreateSchema } from "lib/schemas";
import { useDispatch } from "react-redux";
import { idGenerator } from "utils/index";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import Avatar from "components/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  removeCategory,
  requestCategoryList,
  setCategory,
} from "Store/category/actions";
import { requestQuizListCategory } from "Store/quiz/actions";
import DeleteModal from "components/Modal/DeleteModal";
import { useModalContext } from "components/Modal/modalContext";
import useDeviceType from "hooks/useDeviceType";
import Tabs from "components/Tabs";
type StudentCreateProps = {};

type TStudent = {
  title: string;
  about?: string;
  image?: string;
};

const CategoryCreate: FC<StudentCreateProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useDeviceType();

  const { handleModal } = useModalContext();

  const categoryId = new URLSearchParams(location.search).get("id");

  const { categories } = useSelector(
    (state: RootState) => state.categoryReducer
  );
  const { quizzesCategory } = useSelector(
    (state: RootState) => state.quizReducer
  );

  const userID = localStorage.getItem("userId");

  const [tab, setTab] = useState("Category");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TStudent>({
    resolver: yupResolver(CategoryCreateSchema),
  });

  const onSubmit = (data: TStudent) => {
    const preparedData = {
      id: categoryId !== null ? categoryId : idGenerator(18),
      uid: userID || "",
      userType: "student",
      ...data,
    };

    dispatch(setCategory(preparedData));
    navigate("/quizzes");
  };

  useEffect(() => {
    if (categories === undefined) {
      dispatch(requestCategoryList({ uid: userID || "" }));
    }
  }, [dispatch, categories, userID]);

  useEffect(() => {
    if (quizzesCategory === undefined) {
      dispatch(requestQuizListCategory({ uid: userID || "" }));
    }
  }, [dispatch, quizzesCategory, userID]);

  const crumbs = [
    { label: "Quizzes", path: "/quizzes" },
    { label: categoryId !== null ? "Edit Category" : "Add Category", path: "" },
  ];

  useEffect(() => {
    if (categoryId !== null && categories) {
      reset(...categories?.filter((g) => g.id === categoryId));
    }
  }, [categoryId, categories, reset]);

  const hasQuiz = useMemo(() => {
    return quizzesCategory?.some(
      (a) =>
        a.category === categories?.filter((g) => g.id === categoryId)[0]?.title
    );
  }, [categoryId, categories, quizzesCategory]);

  const handleDelete = () => {
    handleModal(
      <DeleteModal
        deleteTitle={watch("title") || ""}
        onDelete={() => {
          dispatch(
            removeCategory({ uid: userID || "", categoryId: categoryId || "" })
          );
          navigate("/quizzes");
        }}
      />
    );
  };

  const handleUpdateCategory = (id: string) => {
    navigate(`/quizzes/category-create?id=${id}`);
    setTab("Category");
  };

  return (
    <Styled.Container>
      <BreadCrumbs crumbs={crumbs} />
      {isMobile && (
        <Styled.TabContainer>
          <Tabs
            tabs={[{ label: "Category" }, { label: "All Categories" }]}
            activeTab={(tab) => setTab(tab)}
            radius={5}
            active={tab}
          />
        </Styled.TabContainer>
      )}
      <Styled.ContainerInner>
        {(!isMobile || tab === "Category") && (
          <Card
            title={isMobile ? "" : "New Category"}
            isEmpty={false}
            gridName="newQuiz"
            innerCard={isMobile}
          >
            <Styled.Form id="newStudentForm" onSubmit={handleSubmit(onSubmit)}>
              <SimpleInput
                label={"Category Title"}
                placeholder="Enter the category title"
                error={
                  hasQuiz
                    ? {
                        type: "custom",
                        message:
                          "Category has active quiz, name can't be changed",
                      }
                    : errors.title
                }
                {...register("title")}
                disabled={hasQuiz}
              />
              <SimpleInput
                label={"Category image"}
                placeholder="Enter the category image"
                error={errors.image}
                {...register("image")}
              />
              <TextAreaInput
                label="About"
                height="40vh"
                error={errors.about}
                {...register("about")}
              />
            </Styled.Form>
          </Card>
        )}
        {(!isMobile || tab === "All Categories") && (
          <Card
            title={isMobile ? "" : "All Categories"}
            isEmpty={false}
            gridName="newQuestion"
            innerCard={isMobile}
          >
            <Styled.CategoryCardContainer>
              {categories &&
                categories.length > 0 &&
                categories?.map((category) => {
                  return (
                    <Styled.CategoryCard
                      active={category.id === categoryId}
                      onClick={() => handleUpdateCategory(category.id || "")}
                    >
                      <Avatar
                        size="medium"
                        name={category.title}
                        photo={category.image}
                      />
                      <Styled.CategoryTitle>
                        {category.title}
                      </Styled.CategoryTitle>
                    </Styled.CategoryCard>
                  );
                })}
            </Styled.CategoryCardContainer>
          </Card>
        )}
        <Styled.ButtonContainer
          justify={
            categoryId !== null && !hasQuiz ? "space-between" : "flex-end"
          }
        >
          {categoryId !== null && !hasQuiz && (
            <Styled.DeleteButton
              type="button"
              disabled={hasQuiz}
              onClick={handleDelete}
            >
              {isMobile ? "Delete" : "Delete Category"}
            </Styled.DeleteButton>
          )}
          <Styled.SubmitButton type="submit" form="newStudentForm">
            {categoryId !== null ? `Update ` : "Add "}{" "}
            {isMobile ? "" : "Category"}
          </Styled.SubmitButton>
        </Styled.ButtonContainer>
      </Styled.ContainerInner>
    </Styled.Container>
  );
};

export default CategoryCreate;
