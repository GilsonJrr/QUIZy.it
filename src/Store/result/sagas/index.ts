import { takeLatest, put, call } from "redux-saga/effects";

import { result, resultList } from "../actions";

import {
  getResult,
  getResultList,
  setResult,
  removeStudentResult,
  removeQuizResult,
} from "../repository";

import {
  ResultAction,
  ResultRequest,
  ResultTypeValues,
  ResultTypes,
} from "../types";
import { quizList } from "Store/quiz/actions";

//Result
export function* getResultListSaga(props: ResultAction<ResultRequest>): any {
  const uid = props.payload.uid;
  const studentUid = props.payload.studentUid;

  try {
    if (uid) {
      const resultResponses = yield call(getResultList, uid, studentUid);
      yield put(resultList(resultResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* getResultSaga(props: ResultAction<ResultRequest>): any {
  const uid = props.payload.uid;
  const quizUid = props.payload.quizUid || "";
  const studentUid = props.payload.studentUid;

  try {
    if (uid && studentUid) {
      const resultResponses = yield call(getResult, uid, studentUid, quizUid);
      yield put(result(resultResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* setResultSaga(props: ResultAction<ResultTypeValues>): any {
  const uid = props.payload.uid;
  const payload = props.payload;
  const studentUid = props.payload.studentUid;

  try {
    if (uid && payload && studentUid) {
      yield call(setResult, uid, payload);
      const resultResponses = yield call(getResultList, uid);
      yield put(resultList(resultResponses));
      yield put(quizList(resultResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* removeStudentResultSaga(
  props: ResultAction<ResultRequest>
): any {
  const uid = props.payload.uid;
  const studentUid = props.payload.studentUid;

  try {
    if (uid && studentUid) {
      yield call(removeStudentResult, uid, studentUid);
      const resultResponses = yield call(getResultList, uid);
      yield put(resultList(resultResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* removeQuizResultSaga(props: ResultAction<ResultRequest>): any {
  const uid = props.payload.uid;
  const quizUid = props.payload.quizUid;

  try {
    if (uid && quizUid) {
      console.log("teste 2", quizUid, uid);
      yield call(removeQuizResult, uid, quizUid);
      const resultResponses = yield call(getResultList, uid);
      yield put(resultList(resultResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(ResultTypes.SET_RESULT, setResultSaga),
  takeLatest(ResultTypes.REQUEST_RESULT_LIST, getResultListSaga),
  takeLatest(ResultTypes.REQUEST_RESULT, getResultSaga),
  takeLatest(ResultTypes.REMOVE_STUDENT_RESULT, removeStudentResultSaga),
  takeLatest(ResultTypes.REMOVE_QUIZ_RESULT, removeQuizResultSaga),
];
