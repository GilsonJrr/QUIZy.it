import { takeLatest, put, call, take, cancelled } from "redux-saga/effects";

import { alert, alertList } from "../actions";

import {
  getAlert,
  getAlertList,
  setAlert,
  removeAlert,
  subscribeToAlertList,
} from "../repository";

import {
  AlertAction,
  AlertRequest,
  AlertTypeValues,
  AlertTypes,
} from "../types";
import { eventChannel } from "redux-saga";

//ALERT
function createAlertListChannel(uid: string, studentId: string) {
  return eventChannel((emit) => {
    const unsubscribe = subscribeToAlertList(uid, studentId, (quizzes) => {
      emit(quizzes);
    });
    return () => unsubscribe();
  });
}

export function* getAlertListSaga(props: AlertAction<AlertRequest>): any {
  const uid = props.payload.tutorUid;
  const studentUid = props.payload.studentUid;

  const quizListChannel = yield call(
    createAlertListChannel,
    uid || "",
    studentUid || ""
  );
  try {
    while (true) {
      const quizResponses = yield take(quizListChannel);
      yield put(alertList(quizResponses));
    }
  } finally {
    if (yield cancelled()) {
      quizListChannel.close();
    }
  }
}

export function* getAlertSaga(props: AlertAction<AlertRequest>): any {
  const uid = props.payload.tutorUid;
  const alertId = props.payload.alertUid || "";
  const studentUid = props.payload.studentUid;

  try {
    if (uid && studentUid) {
      const alertResponses = yield call(getAlert, uid, studentUid, alertId);
      yield put(alert(alertResponses));
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
      yield call(setAlert, uid, payload);
      const alertResponses = yield call(getAlertList, uid, studentUid);
      yield put(alertList(alertResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* removeAlertSaga(props: AlertAction<AlertRequest>): any {
  const alertId = props.payload.alertUid;
  const uid = props.payload.tutorUid;
  const studentUid = props.payload.studentUid;

  try {
    if (alertId && uid && studentUid) {
      yield call(removeAlert, uid, studentUid, alertId);
      const alertResponses = yield call(getAlertList, uid, studentUid);
      yield put(alertList(alertResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(AlertTypes.SET_ALERT, setAlertSaga),
  takeLatest(AlertTypes.REQUEST_ALERT_LIST, getAlertListSaga),
  takeLatest(AlertTypes.REQUEST_ALERT, getAlertSaga),
  takeLatest(AlertTypes.REMOVE_ALERT, removeAlertSaga),
];
