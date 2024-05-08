import { takeLatest, put, call } from "redux-saga/effects";

import { student, studentList } from "../actions";

import {
  getStudent,
  getStudentList,
  setStudent,
  removeStudent,
} from "../repository";

import {
  StudentAction,
  StudentRequest,
  StudentTypeValues,
  StudentTypes,
} from "../types";

//Student
export function* getStudentListSaga(props: StudentAction<StudentRequest>): any {
  const uid = props.payload.uid;
  const limit = props.payload.limit;

  try {
    if (uid) {
      const userResponses = yield call(getStudentList, uid, limit);
      yield put(studentList(userResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* getStudentSaga(props: StudentAction<StudentRequest>): any {
  const uid = props.payload.uid;
  const studentId = props.payload.studentId || "";

  try {
    if (uid) {
      const userResponses = yield call(getStudent, uid, studentId);
      yield put(student(userResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* setStudentSaga(props: StudentAction<StudentTypeValues>): any {
  const uid = props.payload.uid;
  const payload = props.payload;

  try {
    if (uid && payload) {
      yield call(setStudent, uid, payload);
      const userResponses = yield call(getStudentList, uid);
      yield put(studentList(userResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* removeStudentSaga(props: StudentAction<StudentRequest>): any {
  const studentId = props.payload.studentId;
  const uid = props.payload.uid;

  try {
    if (studentId && uid) {
      yield call(removeStudent, uid, studentId);
      const userResponses = yield call(getStudentList, uid);
      yield put(studentList(userResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(StudentTypes.SET_STUDENT, setStudentSaga),
  takeLatest(StudentTypes.REQUEST_STUDENT_LIST, getStudentListSaga),
  takeLatest(StudentTypes.REQUEST_STUDENT, getStudentSaga),
  takeLatest(StudentTypes.REMOVE_STUDENT, removeStudentSaga),
];
