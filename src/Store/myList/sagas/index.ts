import { takeLatest, put, call } from "redux-saga/effects";

import { myList, myListList } from "../actions";

import {
  getMyList,
  getMyListList,
  setMyList,
  removeMyList,
} from "../repository";

import {
  MyListAction,
  MyListRequest,
  MyListTypeValues,
  MyListTypes,
} from "../types";

//MyList
export function* getMyListListSaga(props: MyListAction<MyListRequest>): any {
  const uid = props.payload.uid;
  const studentUid = props.payload.studentUid;

  try {
    if (uid && studentUid) {
      const myListResponses = yield call(getMyListList, uid, studentUid);
      yield put(myListList(myListResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* getMyListSaga(props: MyListAction<MyListRequest>): any {
  const uid = props.payload.uid;
  const myListId = props.payload.quizUid || "";
  const studentUid = props.payload.studentUid;

  try {
    if (uid && studentUid) {
      const myListResponses = yield call(getMyList, uid, studentUid, myListId);
      yield put(myList(myListResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* setMyListSaga(props: MyListAction<MyListTypeValues>): any {
  const uid = props.payload.uid;
  const payload = props.payload;
  const studentUid = props.payload.studentUid;

  try {
    if (uid && payload && studentUid) {
      yield call(setMyList, uid, payload);
      const myListResponses = yield call(getMyListList, uid, studentUid);
      yield put(myListList(myListResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* removeMyListSaga(props: MyListAction<MyListRequest>): any {
  const myListId = props.payload.quizUid;
  const uid = props.payload.uid;
  const studentUid = props.payload.studentUid;

  try {
    if (myListId && uid && studentUid) {
      yield call(removeMyList, uid, studentUid, myListId);
      const myListResponses = yield call(getMyListList, uid, studentUid);
      yield put(myListList(myListResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(MyListTypes.SET_MYLIST, setMyListSaga),
  takeLatest(MyListTypes.REQUEST_MYLIST_LIST, getMyListListSaga),
  takeLatest(MyListTypes.REQUEST_MYLIST, getMyListSaga),
  takeLatest(MyListTypes.REMOVE_MYLIST, removeMyListSaga),
];
