import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Styled from "./styled";
import BreadCrumbs from "components/BreadCrumbs";
import Card from "components/Card";
import SimpleInput from "components/inputs/SimpleInput";
import TextAreaInput from "components/inputs/TextAreaInput";
import SelectInput from "components/inputs/SelectInput";
import { TFormData, TOption } from "types/index";
type QuizCreateProps = {};

export const NewQuizSchema = Yup.object().shape({
  title: Yup.string().required("You must add a title").min(3),
  description: Yup.string(),
  image: Yup.string().required("You must add a image"),
  type: Yup.string().required("O tipo é obrigatório"),
  category: Yup.string().required("A categoria é obrigatória"),
  questions: Yup.array().of(
    Yup.object().shape({
      questionTitle: Yup.string().required("You must add a title"),
      answer01: Yup.string().required("You must add a right answer"),
      answer02: Yup.string().required("You must add at least one more answer"),
      answer03: Yup.string(),
      answer04: Yup.string(),
      rightAnswer: Yup.string(),
    })
  ),
});

export const NewMultipleQuestions = Yup.object().shape({
  questionTitle: Yup.string().required("You must add a title"),
  answer01: Yup.string().required("You must add a right answer"),
  answer02: Yup.string().required("You must add at least one more answer"),
  answer03: Yup.string(),
  answer04: Yup.string(),
  rightAnswer: Yup.string(),
});

const QuizCreate: FC<QuizCreateProps> = () => {
  const [question, setQuestion] = useState([0]);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    unregister,
    setValue,
  } = useForm<TFormData>({
    resolver: yupResolver(NewQuizSchema),
  });

  const onSubmit = (data: TFormData) => {
    setValue(
      `questions.${selectedQuestion}.rightAnswer`,
      watch(`questions.${selectedQuestion}.answer01`)
    );
    console.log("data", data);
  };

  const handleAddQuestion = () => {
    if (question.length < 15) {
      setQuestion([...question, question[question.length - 1] + 1]);
    }
    setSelectedQuestion(question[question.length - 1] + 1);
  };

  const handleDeleteQuestion = (id: number) => {
    unregister(`questions.${selectedQuestion}`);
    setQuestion(question.filter((a) => a !== id));
    setSelectedQuestion(id - 1);
  };

  const crumbs = [
    { label: "Quizzes", path: "/quizzes" },
    { label: "Add Quiz", path: "/quizzes/quiz-create" },
  ];

  const options: TOption[] = [
    { value: "Multiple", label: "Multiple" },
    { value: "TrueOrFalse", label: "True Or False" },
  ];

  const categoryOptions: TOption[] = [
    { value: "history", label: "History" },
    { value: "geography", label: "Geography" },
  ];

  console.log("question", question, question.length);

  const addButtonDisabled = !question.every((question) => {
    return (
      watch(`questions.${question}.questionTitle`)?.trim() ||
      watch(`questions.${question}.answer01`)?.trim() ||
      watch(`questions.${question}.answer02`)?.trim()
    );
  });

  const errorEmptyQuestion = question.findIndex((q) => {
    const questionData = watch(`questions.${q}`);
    if (!questionData) return true;
    const { questionTitle, answer01, answer02 } = watch(`questions.${q}`);
    return !(questionTitle?.trim() && answer01?.trim() && answer02?.trim());
  });

  const handleTestAllQuestions = () => {
    if (errorEmptyQuestion !== -1) {
      setSelectedQuestion(errorEmptyQuestion);
    }
  };

  const quizType = watch("type") || "Multiple";

  console.log("errorEmptyQuestion", errorEmptyQuestion);

  return (
    <Styled.Container>
      <BreadCrumbs crumbs={crumbs} />
      <Styled.ContainerInner>
        <Card title={"New Quiz"} isEmpty={false} gridName="newQuiz">
          <Styled.Form id="newQuizForm" onSubmit={handleSubmit(onSubmit)}>
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
              <SelectInput
                label={"Category"}
                options={categoryOptions}
                error={errors.category}
                {...register("category")}
              />
            </Styled.SelectContainer>
          </Styled.Form>
        </Card>
        {quizType === "Multiple" ? (
          <Card title={`New Question`} isEmpty={false} gridName="newQuestion">
            <Styled.Form id="newQuizForm" onSubmit={handleSubmit(onSubmit)}>
              <SimpleInput
                label={"Question"}
                placeholder="Enter question title"
                value={
                  watch(`questions.${selectedQuestion}.questionTitle`) || ""
                }
                error={errors.questions?.[selectedQuestion]?.questionTitle}
                {...register(`questions.${selectedQuestion}.questionTitle`)}
              />
              <Styled.AnswerContainer>
                <SimpleInput
                  label={<Styled.Label>Right answer</Styled.Label>}
                  value={watch(`questions.${selectedQuestion}.answer01`) || ""}
                  error={errors.questions?.[selectedQuestion]?.answer01}
                  {...register(`questions.${selectedQuestion}.answer01`)}
                />
                <SimpleInput
                  label={"Answer 2"}
                  value={watch(`questions.${selectedQuestion}.answer02`) || ""}
                  error={errors.questions?.[selectedQuestion]?.answer02}
                  {...register(`questions.${selectedQuestion}.answer02`)}
                />
                <SimpleInput
                  label={"Answer 3"}
                  value={watch(`questions.${selectedQuestion}.answer03`) || ""}
                  error={errors.questions?.[selectedQuestion]?.answer03}
                  {...register(`questions.${selectedQuestion}.answer03`)}
                />
                <SimpleInput
                  label={"Answer 4"}
                  value={watch(`questions.${selectedQuestion}.answer04`) || ""}
                  error={errors.questions?.[selectedQuestion]?.answer04}
                  {...register(`questions.${selectedQuestion}.answer04`)}
                />
              </Styled.AnswerContainer>
            </Styled.Form>
            <Styled.ButtonContainer
              justify={
                question.length > 1 && selectedQuestion !== 0
                  ? "space-between"
                  : "flex-end"
              }
            >
              {question.length > 1 && selectedQuestion !== 0 && (
                <Styled.SubmitButton
                  onClick={() => handleDeleteQuestion(selectedQuestion)}
                >
                  Delete
                </Styled.SubmitButton>
              )}
              <Styled.SubmitButton
                onClick={handleAddQuestion}
                disabled={addButtonDisabled}
              >
                Add
              </Styled.SubmitButton>
            </Styled.ButtonContainer>
            <Styled.QuestionsContainer>
              {question.map((question, index) => {
                return (
                  <Styled.QuestionTag
                    onClick={() => setSelectedQuestion(question)}
                    active={selectedQuestion === question}
                  >
                    Q {index + 1}
                  </Styled.QuestionTag>
                );
              })}
            </Styled.QuestionsContainer>
          </Card>
        ) : (
          <Card title={`New Question`} isEmpty={false} gridName="newQuestion">
            <Styled.Form id="newQuizForm" onSubmit={handleSubmit(onSubmit)}>
              <SimpleInput
                label={"Question"}
                placeholder="Enter question title"
                value={
                  watch(`questions.${selectedQuestion}.questionTitle`) || ""
                }
                error={errors.questions?.[selectedQuestion]?.questionTitle}
                {...register(`questions.${selectedQuestion}.questionTitle`)}
              />
              <Styled.AnswerContainer>
                <SimpleInput
                  label={<Styled.Label>Right answer</Styled.Label>}
                  value={watch(`questions.${selectedQuestion}.answer01`) || ""}
                  error={errors.questions?.[selectedQuestion]?.answer01}
                  {...register(`questions.${selectedQuestion}.answer01`)}
                />
                <SimpleInput
                  label={"Answer 2"}
                  value={watch(`questions.${selectedQuestion}.answer02`) || ""}
                  error={errors.questions?.[selectedQuestion]?.answer02}
                  {...register(`questions.${selectedQuestion}.answer02`)}
                />
              </Styled.AnswerContainer>
            </Styled.Form>
            <Styled.ButtonContainer
              justify={
                question.length > 1 && selectedQuestion !== 0
                  ? "space-between"
                  : "flex-end"
              }
            >
              {question.length > 1 && selectedQuestion !== 0 && (
                <Styled.SubmitButton
                  onClick={() => handleDeleteQuestion(selectedQuestion)}
                >
                  Delete
                </Styled.SubmitButton>
              )}
              <Styled.SubmitButton
                onClick={handleAddQuestion}
                disabled={addButtonDisabled}
              >
                Add
              </Styled.SubmitButton>
            </Styled.ButtonContainer>
            <Styled.QuestionsContainer>
              {question.map((question, index) => {
                return (
                  <Styled.QuestionTag
                    onClick={() => setSelectedQuestion(question)}
                    active={selectedQuestion === question}
                  >
                    Q {index + 1}
                  </Styled.QuestionTag>
                );
              })}
            </Styled.QuestionsContainer>
          </Card>
        )}
        <Styled.ButtonContainer>
          <Styled.SubmitButton
            type="submit"
            form="newQuizForm"
            onClick={handleTestAllQuestions}
          >
            Finish
          </Styled.SubmitButton>
        </Styled.ButtonContainer>
      </Styled.ContainerInner>
    </Styled.Container>
  );
};

export default QuizCreate;
