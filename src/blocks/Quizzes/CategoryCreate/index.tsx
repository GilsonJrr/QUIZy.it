import React, { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Styled from "./styled";
import Card from "components/Card";
import SimpleInput from "components/inputs/SimpleInput";
import TextAreaInput from "components/inputs/TextAreaInput";
import { CategoryCreateSchema } from "lib/schemas";
import { useDispatch } from "react-redux";
import { idGenerator } from "utils/index";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import Avatar from "components/Avatar";
import { useNavigate } from "react-router-dom";
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
import Button from "components/Button";
import AlertModal from "components/Modal/AlertModal";
import { useTranslation } from "react-i18next";
import { Title } from "components/ui/Typography/styled";
import ColorInput from "components/inputs/ColorInput";

type StudentCreateProps = {};

type TStudent = {
  title: string;
  about?: string;
  image?: string;
  color?: string;
};

const CategoryCreate: FC<StudentCreateProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useDeviceType();

  const { handleModal } = useModalContext();

  const { categories } = useSelector((state: RootState) => state.category);
  const { quizzesCategory } = useSelector((state: RootState) => state.quiz);
  const { user } = useSelector((state: RootState) => state.user);

  const userID = user?.info?.uid;

  const [tab, setTab] = useState("Category");
  const [categoryId, setCategoryId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<TStudent>({
    resolver: yupResolver(CategoryCreateSchema),
  });

  const onSubmit = (data: TStudent) => {
    if (categories && categories?.length >= 8) {
      return handleModal(
        <AlertModal
          type="warning"
          title={t("addCategory.categoryCreationLimit")}
          totalTime={6000}
          message={t("addCategory.categoryCreationLimitMessage")}
        />
      );
    }
    const preparedData = {
      id: categoryId !== null ? categoryId : idGenerator(18),
      uid: userID || "",
      ...data,
    };

    if (categories) {
      dispatch(
        setCategory(preparedData),
        handleModal(
          <AlertModal
            type={"success"}
            message={
              categoryId !== null
                ? t("addCategory.categoryUpdateSuccess")
                : t("addCategory.categoryCreateSuccess")
            }
          />
        )
      );
      navigate("/quizzes");
    }
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

  useEffect(() => {
    const categoryArray = Array.isArray(categories) ? categories : [];
    if (categoryId !== null && categories) {
      reset(...categoryArray?.filter((g) => g.id === categoryId));
    }
  }, [categoryId, categories, reset]);

  const hasQuiz = useMemo(() => {
    const categoryArray = Array.isArray(categories) ? categories : [];
    const categoryTitle = categoryArray.filter((g) => g.id === categoryId)[0]
      ?.title;
    return quizzesCategory?.some((a) => a.category === categoryTitle);
  }, [categoryId, categories, quizzesCategory]);

  const handleDelete = () => {
    handleModal(
      <DeleteModal
        deleteTitle={watch("title") || ""}
        onDelete={() => {
          dispatch(
            removeCategory(
              { uid: userID || "", categoryId: categoryId || "" },
              () =>
                handleModal(
                  <AlertModal
                    type={"default"}
                    message={t("addCategory.categoryRemoved")}
                  />
                )
            )
          );
          navigate("/quizzes");
        }}
      />
    );
  };

  const handleUpdateCategory = (id: string) => {
    const emptyState = {
      title: "",
      about: "",
      image: "",
    };
    if (id === categoryId) {
      setCategoryId("");
      setTab("Category");
      reset(emptyState);
    } else {
      setCategoryId(id);
      setTab("Category");
    }
  };

  return (
    <Styled.Container>
      {isMobile && (
        <Styled.TabContainer>
          <Tabs
            tabs={[
              { label: t("addCategory.category") },
              { label: t("addCategory.allCategories") },
            ]}
            activeTab={(tab) => setTab(tab)}
            radius={5}
            active={tab}
            wrap
          />
        </Styled.TabContainer>
      )}
      <Styled.ContainerInner>
        {(!isMobile || tab === t("addCategory.category")) && (
          <Styled.Form id="newCategoryForm" onSubmit={handleSubmit(onSubmit)}>
            <Styled.NameColorContainer>
              <SimpleInput
                maxLength={15}
                label={t("addCategory.categoryTitle")}
                placeholder={t("addCategory.enterCategoryTitle")}
                error={
                  watch("title")?.length === 15
                    ? {
                        type: "custom",
                        message: "Character limit reached! 15/15",
                      }
                    : hasQuiz
                    ? {
                        type: "custom",
                        message: t("addCategory.categoryHasActiveQuiz"),
                      }
                    : errors.title
                }
                {...register("title")}
                disabled={hasQuiz}
              />
              <ColorInput
                color={watch("color") || ""}
                onChange={(color) => setValue("color", color)}
              />
            </Styled.NameColorContainer>
            <TextAreaInput
              label={t("addCategory.about")}
              height="100%"
              error={errors.about}
              {...register("about")}
            />
          </Styled.Form>
        )}
        {(!isMobile || tab === t("addCategory.allCategories")) && (
          <Card
            title={t("addCategory.allCategories")}
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
                        border={category.color}
                      />
                      <Title
                        color={category.id === categoryId ? "light" : "default"}
                      >
                        {category.title}
                      </Title>
                    </Styled.CategoryCard>
                  );
                })}
            </Styled.CategoryCardContainer>
          </Card>
        )}
        <Styled.ButtonContainer
          justify={categoryId !== "" && !hasQuiz ? "space-between" : "flex-end"}
        >
          {categoryId !== "" && !hasQuiz && (
            <Button
              type="button"
              disabled={hasQuiz}
              onClick={handleDelete}
              variant="danger"
            >
              {isMobile
                ? t("addCategory.delete")
                : t("addCategory.deleteCategory")}
            </Button>
          )}
          <Button type="submit" form="newCategoryForm">
            {categoryId !== ""
              ? `${t("addCategory.update")} `
              : `${t("addCategory.add")} `}
            {isMobile ? "" : t("addCategory.category")}
          </Button>
        </Styled.ButtonContainer>
      </Styled.ContainerInner>
    </Styled.Container>
  );
};

export default CategoryCreate;
