import { Reducer } from "redux";
import { ResultTypeValues, ResultTypes, ResultState } from "../types";

interface CleanUpResult {
  type: ResultTypes.RESULT_CLEAN_UP;
}
interface CleanUpResultList {
  type: ResultTypes.RESULT_LIST_CLEAN_UP;
}

interface SetResult {
  type: ResultTypes.SET_RESULT;
  payload: ResultTypeValues[];
}

interface RemoveResult {
  type: ResultTypes.REMOVE_RESULT;
}

interface requestResultList {
  type: ResultTypes.REQUEST_RESULT_LIST;
  payload: ResultTypeValues[];
}

interface ResultList {
  type: ResultTypes.RESULT_LIST;
  payload: ResultTypeValues[];
}

interface requestResult {
  type: ResultTypes.REQUEST_RESULT;
  payload: ResultTypeValues;
}

interface Result {
  type: ResultTypes.RESULT;
  payload: ResultTypeValues;
}

type ResultAction =
  | CleanUpResult
  | CleanUpResultList
  | SetResult
  | requestResultList
  | requestResult
  | ResultList
  | Result
  | RemoveResult;

const resultInitialState: ResultState = {
  isLoading: false,
  results: undefined,
  result: undefined,
  error: undefined,
};

const resultReducer: Reducer<ResultState, ResultAction> = (
  state = resultInitialState,
  action
) => {
  switch (action.type) {
    case ResultTypes.RESULT_CLEAN_UP: {
      return {
        ...state,
        error: undefined,
        payload: undefined,
        result: undefined,
      };
    }
    case ResultTypes.RESULT_LIST_CLEAN_UP: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        payload: undefined,
        results: undefined,
      };
    }
    case ResultTypes.REQUEST_RESULT_LIST: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        results: undefined,
      };
    }
    case ResultTypes.REQUEST_RESULT: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        result: undefined,
      };
    }
    case ResultTypes.RESULT: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        result: action.payload,
      };
    }
    case ResultTypes.RESULT_LIST: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        results: Object.values(action.payload),
      };
    }
    case ResultTypes.SET_RESULT: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        results: action.payload,
      };
    }
    case ResultTypes.REMOVE_RESULT: {
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

export { resultReducer };
