import { QuizTypes, QuizRequest, QuizAction, QuizTypeValues } from "../types";

export function quizCleanUp() {
  return {
    type: QuizTypes.QUIZ_CLEAN_UP,
  };
}

export function quizListCleanUp() {
  return {
    type: QuizTypes.QUIZ_LIST_CLEAN_UP,
  };
}

export function requestQuizList(props: QuizRequest): QuizAction<QuizRequest> {
  return {
    type: QuizTypes.REQUEST_QUIZ_LIST,
    payload: { ...props },
  };
}

export function requestQuizListCategory(
  props: QuizRequest
): QuizAction<QuizRequest> {
  return {
    type: QuizTypes.REQUEST_QUIZ_LIST_CATEGORY,
    payload: { ...props },
  };
}

export function requestQuiz(props: QuizRequest): QuizAction<QuizRequest> {
  return {
    type: QuizTypes.REQUEST_QUIZ,
    payload: { ...props },
  };
}

export function quizList(props: QuizTypeValues): QuizAction<QuizTypeValues> {
  return {
    type: QuizTypes.QUIZ_LIST,
    payload: { ...props },
  };
}

export function quizListCategory(
  props: QuizTypeValues
): QuizAction<QuizTypeValues> {
  return {
    type: QuizTypes.QUIZ_LIST_CATEGORY,
    payload: { ...props },
  };
}

export function quiz(props: QuizTypeValues): QuizAction<QuizTypeValues> {
  return {
    type: QuizTypes.QUIZ,
    payload: { ...props },
  };
}

export function setQuiz(
  props: QuizRequest,
  onSuccess?: () => void
): QuizAction<QuizRequest> {
  return {
    type: QuizTypes.SET_QUIZ,
    payload: { ...props },
    onSuccess,
  };
}

export function removeQuiz(
  props: QuizRequest,
  onSuccess?: () => void
): QuizAction<QuizRequest> {
  return {
    type: QuizTypes.REMOVE_QUIZ,
    payload: { ...props },
    onSuccess,
  };
}
