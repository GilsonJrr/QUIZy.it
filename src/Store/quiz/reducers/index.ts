import { Reducer } from "redux";
import { QuizTypeValues, QuizTypes, QuizState } from "../types";

interface CleanUpQuiz {
  type: QuizTypes.QUIZ_CLEAN_UP;
}
interface CleanUpQuizList {
  type: QuizTypes.QUIZ_LIST_CLEAN_UP;
}

interface SetQuiz {
  type: QuizTypes.SET_QUIZ;
  payload: QuizTypeValues[];
}

interface RemoveQuiz {
  type: QuizTypes.REMOVE_QUIZ;
}

interface requestQuizList {
  type: QuizTypes.REQUEST_QUIZ_LIST;
  payload: QuizTypeValues[];
}

interface requestQuizListCategory {
  type: QuizTypes.REQUEST_QUIZ_LIST_CATEGORY;
  payload: QuizTypeValues[];
}

interface QuizList {
  type: QuizTypes.QUIZ_LIST;
  payload: QuizTypeValues[];
}

interface QuizListCategory {
  type: QuizTypes.QUIZ_LIST_CATEGORY;
  payload: QuizTypeValues[];
}

interface requestQuiz {
  type: QuizTypes.REQUEST_QUIZ;
  payload: QuizTypeValues;
}

interface Quiz {
  type: QuizTypes.QUIZ;
  payload: QuizTypeValues;
}

type QuizAction =
  | CleanUpQuiz
  | CleanUpQuizList
  | SetQuiz
  | requestQuizList
  | requestQuiz
  | QuizList
  | Quiz
  | RemoveQuiz
  | requestQuizListCategory
  | QuizListCategory;

const quizInitialState: QuizState = {
  isLoading: false,
  quizzes: undefined,
  quiz: undefined,
  error: undefined,
  quizzesCategory: undefined,
  quizCategoryLoading: false,
};

const quizReducer: Reducer<QuizState, QuizAction> = (
  state = quizInitialState,
  action
) => {
  switch (action.type) {
    case QuizTypes.QUIZ_CLEAN_UP: {
      return {
        ...state,
        error: undefined,
        payload: undefined,
        quiz: undefined,
      };
    }
    case QuizTypes.QUIZ_LIST_CLEAN_UP: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        payload: undefined,
        quizzes: undefined,
      };
    }
    case QuizTypes.REQUEST_QUIZ_LIST: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        quizzes: undefined,
      };
    }
    case QuizTypes.REQUEST_QUIZ_LIST_CATEGORY: {
      return {
        ...state,
        quizCategoryLoading: true,
        error: undefined,
        quizzesCategory: undefined,
      };
    }
    case QuizTypes.REQUEST_QUIZ: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        quiz: undefined,
      };
    }
    case QuizTypes.QUIZ: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        quiz: action.payload,
      };
    }
    case QuizTypes.QUIZ_LIST: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        quizzes: Object.values(action.payload),
      };
    }
    case QuizTypes.QUIZ_LIST_CATEGORY: {
      return {
        ...state,
        quizCategoryLoading: false,
        error: undefined,
        quizzesCategory: Object.values(action.payload),
      };
    }
    case QuizTypes.SET_QUIZ: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        quizzes: action.payload,
      };
    }
    case QuizTypes.REMOVE_QUIZ: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export { quizReducer };
