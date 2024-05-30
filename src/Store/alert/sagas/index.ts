import { takeLatest, put, call, take, cancelled } from "redux-saga/effects";

import { alertStudentList, alertTutorList } from "../actions";

import {
  getStudentAlert,
  getStudentAlertList,
  setStudentAlert,
  removeStudentAlert,
  subscribeToStudentAlertList,
  getTutorAlertList,
  setTutorAlert,
  removeTutorAlert,
  subscribeToTutorAlertList,
} from "../repository";

import {
  AlertAction,
  AlertRequest,
  AlertTypeValues,
  AlertTypes,
} from "../types";
import { eventChannel } from "redux-saga";

//ALERT
function createStudentAlertListChannel(uid: string, studentId: string) {
  return eventChannel((emit) => {
    const unsubscribe = subscribeToStudentAlertList(
      uid,
      studentId,
      (quizzes) => {
        emit(quizzes);
      }
    );
    return () => unsubscribe();
  });
}

function createTutorAlertListChannel(uid: string) {
  return eventChannel((emit) => {
    const unsubscribe = subscribeToTutorAlertList(uid, (quizzes) => {
      emit(quizzes);
    });
    return () => unsubscribe();
  });
}

export function* getStudentAlertListSaga(
  props: AlertAction<AlertRequest>
): any {
  const uid = props.payload.tutorUid;
  const studentUid = props.payload.studentUid;

  const quizStudentListChannel = yield call(
    createStudentAlertListChannel,
    uid || "",
    studentUid || ""
  );
  try {
    while (true) {
      const quizResponses = yield take(quizStudentListChannel);
      yield put(alertStudentList(quizResponses));
    }
  } finally {
    if (yield cancelled()) {
      quizStudentListChannel.close();
    }
  }
}

export function* getTutorAlertListSaga(props: AlertAction<AlertRequest>): any {
  const uid = props.payload.tutorUid;

  const quizTutorListChannel = yield call(
    createTutorAlertListChannel,
    uid || ""
  );
  try {
    while (true) {
      const quizResponses = yield take(quizTutorListChannel);
      yield put(alertTutorList(quizResponses));
    }
  } finally {
    if (yield cancelled()) {
      quizTutorListChannel.close();
    }
  }
}

export function* getAlertSaga(props: AlertAction<AlertRequest>): any {
  const uid = props.payload.tutorUid;
  const alertId = props.payload.alertUid || "";
  const studentUid = props.payload.studentUid;

  try {
    if (uid && studentUid) {
      yield call(getStudentAlert, uid, studentUid, alertId);
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* setAlertSaga(props: AlertAction<AlertTypeValues>): any {
  const uid = props.payload.tutorUid;
  const payload = props.payload;
  const studentUid = props.payload.studentUid;

  try {
    if (uid && payload && studentUid) {
      if (payload.userType === "student") {
        yield call(setTutorAlert, payload);
      }
      if (payload.userType === "tutor") {
        yield call(setStudentAlert, payload);
      }
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* removeAlertSaga(props: AlertAction<AlertTypeValues>): any {
  const alertId = props.payload.alertUid;
  const uid = props.payload.tutorUid;
  const studentUid = props.payload.studentUid;
  const payload = props.payload;

  try {
    if (payload.userType === "student" && alertId && uid && studentUid) {
      yield call(removeStudentAlert, uid, studentUid, alertId);
      const alertResponses = yield call(getStudentAlertList, uid, studentUid);
      yield put(alertStudentList(alertResponses));
    }
    if (payload.userType === "tutor" && alertId && uid) {
      yield call(removeTutorAlert, uid, alertId);
      const alertResponses = yield call(getTutorAlertList, uid);
      yield put(alertTutorList(alertResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(AlertTypes.SET_ALERT, setAlertSaga),
  takeLatest(AlertTypes.REQUEST_STUDENT_ALERT_LIST, getStudentAlertListSaga),
  takeLatest(AlertTypes.REQUEST_TUTOR_ALERT_LIST, getTutorAlertListSaga),
  takeLatest(AlertTypes.REQUEST_ALERT, getAlertSaga),
  takeLatest(AlertTypes.REMOVE_ALERT, removeAlertSaga),
];
