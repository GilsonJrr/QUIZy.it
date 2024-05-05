import { ReactNode } from "react";

//types
export type QuizQuestion = {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: {
    text: string;
  };
  tags: string[];
  type: "text_choice";
  difficulty: "easy" | "medium" | "hard";
  regions: string[];
  isNiche: boolean;
};

export type Answer = {
  id: number;
  answer: string | undefined;
  type: string;
};

export type QuestionFiltered = {
  question: string;
  answers: Answer[];
  correctAnswers: string;
};

export type TCollection = {
  id: number;
  uid: number;
  title: string;
  subTitle: string;
  image: string;
  info?: string[];
  difficult?: string;
  type?: string;
};

export type TCategories = {
  title: string;
  image?: string;
};

export type TQUiz = {
  difficulty: string;
  type: string;
  amount: number;
};

export type TResult = {
  quiz: string | number;
  score: string;
  date: string;
  quizInfo: TQUiz;
};

export type THeader = {
  label: string;
  width: number;
  align?: "center" | "flex-start";
};

export type TOptions = {
  option?: string;
  optionIcon?: ReactNode;
  onClick?: () => void;
};

export type TStudentList = {
  Name: string;
  Group: string;
  Average: string;
  Email: string;
  Phone: string;
  Photo: string;
};

export type TTutorResult = {
  name: string;
  quiz: string;
  score: string;
};

//enums
export enum EAnswerIndexation {
  A = 0,
  B = 1,
  C = 2,
  D = 3,
}

export enum EQuizTitle {
  "General Knowledge" = 9,
  "Books" = 10,
  "Film" = 11,
  "Music" = 12,
  "Musicals & Theatres" = 13,
  "Television" = 14,
  "Video Games" = 15,
  "Board Games" = 16,
  "Science & Nature" = 17,
  "Computers" = 18,
  "Mathematics" = 19,
  "Mythology" = 20,
  "Sports" = 21,
  "Geography" = 22,
  "History" = 23,
  "Politics" = 24,
  "Art" = 25,
  "Celebrities" = 26,
  "Animals" = 27,
  "Vehicles" = 28,
  "Comics" = 29,
  "Gadgets" = 30,
  "Anime & Manga" = 31,
  "Cartoon & Animations" = 32,
}

export enum RouterTitle {
  "/home" = "Dashboard",
  "/" = "Dashboard",
  "/user" = "User",
  "/settings" = "Settings",
  "/results" = "Results",
  "/quizzes" = "Quizzes",
  "/students" = "Students",
  "/messages" = "Messages",
}
