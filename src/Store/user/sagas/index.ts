import { takeLatest, put, call } from "redux-saga/effects";

import { tutorInfo, user, userStudent } from "../actions";

import {
  getTutorInfo,
  getUser,
  getUserStudent,
  setNewStudent,
  setStudentUser,
  setUser,
} from "../repository";

import { UserAction, UseData, UserTypes, UserRequest } from "../types";
import { getStudentList } from "Store/students/repository";
import { studentList } from "Store/students/actions";

export function* requestUserStudentSaga(props: UserAction<UserRequest>): any {
  const uid = props.payload.uid;

  try {
    if (uid) {
      const userAgendaResponses = yield call(getUserStudent, uid);
      localStorage.setItem("userType", userAgendaResponses.userType);
      yield put(userStudent(userAgendaResponses));
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export function* requestTutorPhotoSaga(props: UserAction<UserRequest>): any {
  const uid = props.payload.uid;

  try {
    if (uid) {
      const responses = yield call(getTutorInfo, uid);
      yield put(tutorInfo(responses));
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export function* requestUserSaga(props: UserAction<UserRequest>): any {
  const uid = props.payload.uid;

  try {
    if (uid) {
      const userAgendaResponses = yield call(getUser, uid);
      localStorage.setItem("userType", userAgendaResponses.info.userType);
      yield put(user(userAgendaResponses));
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export function* setStudentUserSaga(props: UserAction<UseData>): any {
  const uid = props.payload.uid;
  const payload = props.payload;
  const onSuccess = props.payload.onSuccess;

  try {
    if (uid && payload) {
      yield call(setStudentUser, uid, payload);

      yield put(() => onSuccess?.());
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export function* setUserSaga(props: UserAction<UseData>): any {
  const uid = props.payload.uid;
  const payload = props.payload;
  const onSuccess = props.payload.onSuccess;

  try {
    if (uid && payload) {
      yield call(setUser, uid, payload);
      const userAgendaResponses = yield call(getUser, uid);
      yield put(user(userAgendaResponses));

      yield put(() => onSuccess?.());
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}

export function* setStudentToUserSaga(props: UserAction<UseData>): any {
  const uid = props.payload.tutorID;
  const payload = props.payload;
  const onSuccess = props.payload.onSuccess;

  try {
    if (uid && payload) {
      yield call(setNewStudent, uid, payload);
      const userAgendaResponses = yield call(getUser, uid);
      yield put(user(userAgendaResponses));
      const studentResponses = yield call(getStudentList, uid || "");
      yield put(studentList(studentResponses));

      yield put(() => onSuccess?.());
    }
  } catch (err: any) {
    // yield put(authError('cannot sign In'));
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(UserTypes.REQUEST_USER, requestUserSaga),
  takeLatest(UserTypes.REQUEST_USER_STUDENT, requestUserStudentSaga),
  takeLatest(UserTypes.SET_USER, setUserSaga),
  takeLatest(UserTypes.SET_STUDENT_TO_USER, setStudentToUserSaga),
  takeLatest(UserTypes.SET_USER_STUDENT, setStudentUserSaga),
  takeLatest(UserTypes.REQUEST_TUTOR_INFO, requestTutorPhotoSaga),
];
