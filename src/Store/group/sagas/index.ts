import { takeLatest, put, call } from "redux-saga/effects";

import { group, groupList } from "../actions";

import { getGroup, getGroupList, setGroup, removeGroup } from "../repository";

import {
  GroupAction,
  GroupRequest,
  GroupTypeValues,
  GroupTypes,
} from "../types";

//Group
export function* getGroupListSaga(props: GroupAction<GroupRequest>): any {
  const uid = props.payload.uid;
  try {
    if (uid) {
      const groupResponses = yield call(getGroupList, uid);
      yield put(groupList(groupResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* getGroupSaga(props: GroupAction<GroupRequest>): any {
  const uid = props.payload.uid;
  const groupId = props.payload.groupId || "";

  try {
    if (uid) {
      const groupResponses = yield call(getGroup, uid, groupId);
      yield put(group(groupResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* setGroupSaga(props: GroupAction<GroupTypeValues>): any {
  const uid = props.payload.uid;
  const payload = props.payload;
  const onSuccess = props.onSuccess;

  try {
    if (uid && payload) {
      yield call(setGroup, uid, payload);
      const groupResponses = yield call(getGroupList, uid);
      yield put(groupList(groupResponses));
      yield put(() => onSuccess?.());
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* removeGroupSaga(props: GroupAction<GroupTypeValues>): any {
  const groupId = props.payload.groupId;
  const uid = props.payload.uid;
  const onSuccess = props.onSuccess;

  try {
    if (groupId && uid) {
      yield call(removeGroup, uid, groupId);
      const groupResponses = yield call(getGroupList, uid);
      yield put(groupList(groupResponses));
      yield put(() => onSuccess?.());
    }
  } catch (err: any) {
    yield put(err);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(GroupTypes.SET_GROUP, setGroupSaga),
  takeLatest(GroupTypes.REQUEST_GROUP_LIST, getGroupListSaga),
  takeLatest(GroupTypes.REQUEST_GROUP, getGroupSaga),
  takeLatest(GroupTypes.REMOVE_GROUP, removeGroupSaga),
];
