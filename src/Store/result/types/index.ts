export enum ResultTypes {
  RESULT_CLEAN_UP = "RESULT_CLEAN_UP",
  RESULT_LIST_CLEAN_UP = "RESULT_LIST_CLEAN_UP",
  SET_RESULT = "SET_RESULT",
  REQUEST_RESULT_LIST = "REQUEST_RESULT_LIST",
  REQUEST_RESULT = "REQUEST_RESULT",
  RESULT_LIST = "RESULT_LIST",
  RESULT = "RESULT",
  REMOVE_RESULT = "REMOVE_RESULT",
}

export type ResultAction<Payload> = {
  type: ResultTypes;
  payload: Payload;
};

export type ResultRequest = {
  uid: string;
  resultId?: string;
  studentUid?: string;
  quizUid?: string;
};

export type TQuizResume = {
  question?: string;
  rightAnswer?: string;
  selectedAnswer?: string;
  selectedValue?: string;
  type?: string;
  value?: string;
};

export type ResultTypeValues = {
  tutorUid?: string;
  uid?: string;
  quizUid?: string;
  quizTitle?: string;
  amount?: string;
  score?: string;
  resume?: TQuizResume[];
  studentUid?: string;
  date?: string;
  quizCategory?: string;
  studentName?: string;
  timeSpent: string;
  tries: string;
};

export type ResultState = {
  isLoading: boolean;
  error: string | undefined;
  results: ResultTypeValues[] | undefined;
  result: ResultTypeValues | undefined;
};
