import { takeLatest, put, call } from "redux-saga/effects";

import { user } from "../actions";

import { getUser, setNewStudent, setUser } from "../repository";

import { UserAction, UseData, UserTypes, UserRequest } from "../types";
import { getStudentList } from "Store/students/repository";
import { studentList } from "Store/students/actions";

//agenda
export function* requestUserSaga(props: UserAction<UserRequest>): any {
  const uid = props.payload.uid;

  try {
    if (uid) {
      const userAgendaResponses = yield call(getUser, uid);
      console.log("userAgendaResponses", userAgendaResponses);
      yield put(user(userAgendaResponses));
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export function* setStudentUserSaga(props: UserAction<UseData>): any {
  const uid = props.payload.uid;
  const payload = props.payload;

  try {
    if (uid && payload) {
      yield call(setUser, uid, payload);
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export function* setUserSaga(props: UserAction<UseData>): any {
  const uid = props.payload.uid;
  const payload = props.payload;

  try {
    if (uid && payload) {
      yield call(setUser, uid, payload);
      const userAgendaResponses = yield call(getUser, uid);
      yield put(user(userAgendaResponses));
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export function* setStudentToUserSaga(props: UserAction<UseData>): any {
  const uid = props.payload.tutorID;
  const payload = props.payload;

  try {
    if (uid && payload) {
      yield call(setNewStudent, uid, payload);
      const userAgendaResponses = yield call(getUser, uid);
      yield put(user(userAgendaResponses));
      const studentResponses = yield call(getStudentList, uid || "");
      console.log("studentResponses", studentResponses);
      yield put(studentList(studentResponses));
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(UserTypes.REQUEST_USER, requestUserSaga),
  takeLatest(UserTypes.SET_USER, setUserSaga),
  takeLatest(UserTypes.SET_STUDENT_TO_USER, setStudentToUserSaga),
  takeLatest(UserTypes.SET_USER_STUDENT, setStudentUserSaga),
];
