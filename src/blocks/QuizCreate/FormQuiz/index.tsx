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
    console.log("data", data);
    quizType(watch("type"));
    localStorage.setItem("preSendQuiz", JSON.stringify(data));
  };

  const renderPreview = () => {
    return (
      <RenderQuizCard
        item={{
          title: watch("title"),
          description: watch("description") || "",
          image: watch("image") || "",
          category: watch("category"),
          type: watch("type"),
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

  // const myList: TCollection[] = JSON.parse(
  //   localStorage.getItem("netQuiz_my_list") || "null"
  // );

  useEffect(() => {
    if (getPeQuiz) {
      reset(getPeQuiz);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  return (
    <QuizForm
      preview={renderPreview()}
      edit={false}
      formName={"FormQuiz"}
      title={"New Quiz"}
      buttonTitle="Add Questions"
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
