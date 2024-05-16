import { ResultTypeValues } from "Store/result/types";

export enum QuizTypes {
  QUIZ_CLEAN_UP = "QUIZ_CLEAN_UP",
  QUIZ_LIST_CLEAN_UP = "QUIZ_LIST_CLEAN_UP",
  SET_QUIZ = "SET_QUIZ",
  REQUEST_QUIZ_LIST = "REQUEST_QUIZ_LIST",
  REQUEST_QUIZ_LIST_CATEGORY = "REQUEST_QUIZ_LIST_CATEGORY",
  REQUEST_QUIZ = "REQUEST_QUIZ",
  QUIZ_LIST = "QUIZ_LIST",
  QUIZ_LIST_CATEGORY = "QUIZ_LIST_CATEGORY",
  QUIZ = "QUIZ",
  REMOVE_QUIZ = "REMOVE_QUIZ",
}

export type QuizAction<Payload> = {
  type: QuizTypes;
  payload: Payload;
};

export type QuizRequest = {
  uid: string;
  quizId?: string;
  category?: string;
  size?: number;
};

export type TMultipleQuestions = {
  questionTitle: string;
  answer01: string;
  answer02: string;
  answer03?: string;
  answer04?: string;
  rightAnswer?: string;
};

export type TTrueOrFalseQuestions = {
  questionTitle: string;
  rightAnswer?: boolean;
};

export type QuizTypeValues = {
  id?: string;
  uid?: string;
  title: string;
  description?: string;
  image?: string;
  type: string;
  category: string;
  questions?: TMultipleQuestions[] | TTrueOrFalseQuestions[];
  results?: ResultTypeValues[];
  date?: string;
};

export type QuizState = {
  isLoading: boolean;
  quizCategoryLoading: boolean;
  error: string | undefined;
  quizzes: QuizTypeValues[] | undefined;
  quizzesCategory: QuizTypeValues[] | undefined;
  quiz: QuizTypeValues | undefined;
};
