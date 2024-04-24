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

export type collectionType = {
  id: number;
  title: string;
  subTitle: string;
  image: string;
  info?: string[];
  action: () => void;
};

//enums
export enum EAnswerIndexation {
  A = 0,
  B = 1,
  C = 2,
  D = 3,
}
