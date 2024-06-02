import { takeLatest, put, call, take, cancelled } from "redux-saga/effects";

import { alertList } from "../actions";

import {
  subscribeToAlertList,
  setAlert,
  removeAlert,
  getAlert,
} from "../repository";

import { AlertAction, AlertTypeValues, AlertTypes } from "../types";
import { eventChannel } from "redux-saga";

//ALERT

function createAlertListChannel(uid: string, receiverUid: string) {
  return eventChannel((emit) => {
    const unsubscribe = subscribeToAlertList(uid, receiverUid, (quizzes) => {
      emit(quizzes);
    });
    return () => unsubscribe();
  });
}

export function* getAlertListSaga(props: AlertAction<AlertTypeValues>): any {
  const payload = props.payload;

  const quizTutorListChannel = yield call(
    createAlertListChannel,
    payload.tutorUid || "",
    payload.receiverUid || ""
  );
  try {
    while (true) {
      const quizResponses = yield take(quizTutorListChannel);
      console.log("quizResponses", quizResponses, payload);
      yield put(alertList(quizResponses));
    }
  } finally {
    if (yield cancelled()) {
      quizTutorListChannel.close();
    }
  }
}

export function* getAlertSaga(props: AlertAction<AlertTypeValues>): any {
  const payload = props.payload;

  try {
    if (payload) {
      yield call(getAlert, payload);
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* setAlertSaga(props: AlertAction<AlertTypeValues>): any {
  const payload = props.payload;

  try {
    if (payload) {
      yield call(setAlert, payload);
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* removeAlertSaga(props: AlertAction<AlertTypeValues>): any {
  const payload = props.payload;

  try {
    if (payload) {
      yield call(removeAlert, payload);
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
