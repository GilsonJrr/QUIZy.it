import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Styled from "./styled";
import SimpleInput from "components/inputs/SimpleInput";
import TextAreaInput from "components/inputs/TextAreaInput";
import SelectInput from "components/inputs/SelectInput";
import { TOption } from "types/index";
import { NewQuizSchema } from "lib/schemas";
import RenderQuizCard from "components/renderItems/RenderQuizCard";
import QuizForm from "layout/QuizForm";
import { useSelector } from "react-redux";
import { RootState } from "Store/root-reducer";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { requestQuiz } from "Store/quiz/actions";
import LoadingSpinner from "components/LoadingSpiner";
import { LoadingContainerFullPage } from "components/Container/styled";

type FormQuizProps = {
  quizType: (value: string) => void;
};

type TFormData = {
  title: string;
  description?: string;
  image?: string;
  type: string;
  category: string;
};

const FormQuiz: FC<FormQuizProps> = ({ quizType }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { quiz, isLoading } = useSelector(
    (state: RootState) => state.quizReducer
  );
  const quizId = new URLSearchParams(location.search).get("quizId");

  const { categories } = useSelector(
    (state: RootState) => state.categoryReducer
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: yupResolver(NewQuizSchema),
  });

  const onSubmit = (data: TFormData) => {
    quizType(watch("type"));
    localStorage.setItem("preSendQuiz", JSON.stringify(data));
  };

  useEffect(() => {
    if (quizId) {
      dispatch(
        requestQuiz({ uid: user?.info?.uid || "", quizId: quizId || "" })
      );
    }
  }, [dispatch, quizId, user?.info?.uid]);

  const renderPreview = () => {
    return (
      <RenderQuizCard
        editMode
        item={{
          title: watch("title"),
          description: watch("description") || "",
          image: watch("image") || "",
          category:
            watch("category") === "categoryLess" ? "" : watch("category"),
          type: watch("type"),
          id: quizId || "",
        }}
      />
    );
  };

  const options: TOption[] = [
    { value: "Multiple", label: "Multiple" },
    { value: "TrueOrFalse", label: "True Or False" },
  ];

  const categoryOptions: TOption[] =
    categories && categories?.length > 0
      ? categories?.map((category) => {
          return { label: category.title, value: category.title };
        })
      : [];

  const getPeQuiz = JSON.parse(localStorage.getItem("preSendQuiz") || "null");

  useEffect(() => {
    if (getPeQuiz || quiz) {
      return reset(getPeQuiz || quiz);
    }
  }, [reset, getPeQuiz, quiz]);

  useEffect(() => {
    if (quizId === null) {
      const emptyState: TFormData = {
        category: "categoryLess",
        title: "",
        type: "Multiple",
        description: "",
        image: "",
      };
      reset(emptyState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <LoadingContainerFullPage>
        <LoadingSpinner size="big" />
      </LoadingContainerFullPage>
    );
  }

  return (
    <QuizForm
      preview={renderPreview()}
      edit={false}
      formName={"FormQuiz"}
      title={"New Quiz"}
      buttonTitle={quizId ? "Edit Questions" : "Add Questions"}
    >
      <Styled.Form id="FormQuiz" onSubmit={handleSubmit(onSubmit)}>
        <SimpleInput
          label={"Title"}
          placeholder="Enter the quiz title"
          error={errors.title}
          {...register("title")}
        />
        <TextAreaInput
          label="Description"
          height="25vh"
          error={errors.description}
          {...register("description")}
        />
        <SimpleInput
          label={"Image"}
          placeholder="Choose a image"
          error={errors.image}
          {...register("image")}
        />
        <Styled.SelectContainer>
          <SelectInput
            label={"Type"}
            options={options}
            error={errors.type}
            {...register("type")}
          />
          {categoryOptions.length > 0 && (
            <SelectInput
              label={"Category"}
              options={[
                { label: "Select a Category", value: "categoryLess" },
                ...categoryOptions,
              ]}
              error={errors.category}
              {...register("category")}
            />
          )}
        </Styled.SelectContainer>
      </Styled.Form>
    </QuizForm>
  );
};

export default FormQuiz;
