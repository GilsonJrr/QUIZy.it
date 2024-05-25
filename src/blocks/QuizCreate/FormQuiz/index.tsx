import React, { FC, useEffect, useState } from "react";
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
import { setImgQuiz } from "Store/quiz/repository";
import { QuizTypeValues } from "Store/quiz/types";
import { RowContainer } from "components/ui/Containers/styled";
import useDeviceType from "hooks/useDeviceType";

type FormQuizProps = {
  quizType: (value: string) => void;
};

type TFormData = {
  title: string;
  description?: string;
  image?: string;
  type: string;
  category: string;
  date?: string;
};

const FormQuiz: FC<FormQuizProps> = ({ quizType }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isMobile = useDeviceType();

  const { user } = useSelector((state: RootState) => state.user);
  const { quiz, isLoading } = useSelector((state: RootState) => state.quiz);
  const quizId = new URLSearchParams(location.search).get("quizId");

  const { categories } = useSelector((state: RootState) => state.category);

  const [imgLoading, setImgLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: yupResolver(NewQuizSchema),
  });

  const onSubmit = (data: TFormData) => {
    quizType(watch("type"));
    const { date, ...rest } = data;
    const dataWithDate = {
      ...rest,
      date: Date.now(),
    };
    localStorage.setItem("preSendQuiz", JSON.stringify(dataWithDate));
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
        preview
        loading={imgLoading}
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
    { value: "FillTheBlanks", label: "Fill The Blanks" },
  ];

  const categoryOptions: TOption[] =
    categories && categories?.length > 0
      ? categories?.map((category) => {
          return { label: category.title, value: category.title };
        })
      : [];

  useEffect(() => {
    const getPeQuiz = JSON.parse(localStorage.getItem("preSendQuiz") || "null");
    const emptyState: TFormData = {
      category: "categoryLess",
      title: "",
      type: "Multiple",
      description: "",
      image: "",
    };

    if ((quizId === null && getPeQuiz) || (quizId !== null && quiz)) {
      return reset(getPeQuiz || quiz);
    }

    if ((quizId === null && !getPeQuiz) || (quizId === null && quiz)) {
      return reset(emptyState);
    }
  }, [quiz, quizId, reset]);

  const image = localStorage.getItem(`${quizId}_quiz_image`) || "";

  useEffect(() => {
    setValue("image", image);
  }, [image, setValue]);

  const handleUploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quizImageData: QuizTypeValues = {
      uid: user?.info?.uid || "",
      id: quizId || "",
      image: (event.target.files?.[0] as unknown as string) || "",
    };
    setImgLoading(true);
    setImgQuiz(quizImageData).then(({ pic, loading }) => {
      setImgLoading(loading);
      setValue("image", pic);
    });
  };

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
      disabled={imgLoading}
      loading={imgLoading}
    >
      <Styled.Form id="FormQuiz" onSubmit={handleSubmit(onSubmit)}>
        <RowContainer gap="20px">
          <SimpleInput
            label={"Title"}
            placeholder="Enter the quiz title"
            error={errors.title}
            {...register("title")}
          />
          <SelectInput
            label={"Type"}
            options={options}
            error={errors.type}
            {...register("type")}
          />
        </RowContainer>
        <RowContainer gap="20px">
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
          <SimpleInput
            type="file"
            label={"Image"}
            placeholder="Enter the student Image"
            error={errors.image}
            {...register("image")}
            onChange={handleUploadPhoto}
          />
        </RowContainer>
        <TextAreaInput
          label="Description"
          height={isMobile ? "25vh" : "38vh"}
          error={errors.description}
          {...register("description")}
        />
      </Styled.Form>
    </QuizForm>
  );
};

export default FormQuiz;
