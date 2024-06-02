import {
  ResultTypes,
  ResultRequest,
  ResultAction,
  ResultTypeValues,
} from "../types";

export function resultCleanUp() {
  return {
    type: ResultTypes.RESULT_CLEAN_UP,
  };
}

export function resultListCleanUp() {
  return {
    type: ResultTypes.RESULT_LIST_CLEAN_UP,
  };
}

export function requestResultList(
  props: ResultRequest
): ResultAction<ResultRequest> {
  return {
    type: ResultTypes.REQUEST_RESULT_LIST,
    payload: { ...props },
  };
}

export function requestResult(
  props: ResultRequest
): ResultAction<ResultRequest> {
  return {
    type: ResultTypes.REQUEST_RESULT,
    payload: { ...props },
  };
}

export function resultList(
  props: ResultTypeValues
): ResultAction<ResultTypeValues> {
  return {
    type: ResultTypes.RESULT_LIST,
    payload: { ...props },
  };
}

export function result(
  props: ResultTypeValues
): ResultAction<ResultTypeValues> {
  return {
    type: ResultTypes.RESULT,
    payload: { ...props },
  };
}

export function setResult(props: ResultRequest): ResultAction<ResultRequest> {
  return {
    type: ResultTypes.SET_RESULT,
    payload: { ...props },
  };
}

export function removeStudentResult(
  props: ResultRequest
): ResultAction<ResultRequest> {
  return {
    type: ResultTypes.REMOVE_STUDENT_RESULT,
    payload: { ...props },
  };
}

export function removeQuizResult(
  props: ResultRequest
): ResultAction<ResultRequest> {
  return {
    type: ResultTypes.REMOVE_QUIZ_RESULT,
    payload: { ...props },
  };
}
