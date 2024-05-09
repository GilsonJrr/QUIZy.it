import { takeLatest, put, call } from "redux-saga/effects";

import { category, categoryList } from "../actions";

import {
  getCategory,
  getCategoryList,
  setCategory,
  removeCategory,
} from "../repository";

import {
  CategoryAction,
  CategoryRequest,
  CategoryTypeValues,
  CategoryTypes,
} from "../types";

//Category
export function* getCategoryListSaga(
  props: CategoryAction<CategoryRequest>
): any {
  const uid = props.payload.uid;
  try {
    if (uid) {
      const categoryResponses = yield call(getCategoryList, uid);
      yield put(categoryList(categoryResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* getCategorySaga(props: CategoryAction<CategoryRequest>): any {
  const uid = props.payload.uid;
  const categoryId = props.payload.categoryId || "";

  try {
    if (uid) {
      const categoryResponses = yield call(getCategory, uid, categoryId);
      yield put(category(categoryResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* setCategorySaga(
  props: CategoryAction<CategoryTypeValues>
): any {
  const uid = props.payload.uid;
  const payload = props.payload;

  try {
    if (uid && payload) {
      yield call(setCategory, uid, payload);
      const categoryResponses = yield call(getCategoryList, uid);
      yield put(categoryList(categoryResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* removeCategorySaga(
  props: CategoryAction<CategoryRequest>
): any {
  const categoryId = props.payload.categoryId;
  const uid = props.payload.uid;

  try {
    if (categoryId && uid) {
      yield call(removeCategory, uid, categoryId);
      const categoryResponses = yield call(getCategoryList, uid);
      yield put(categoryList(categoryResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(CategoryTypes.SET_CATEGORY, setCategorySaga),
  takeLatest(CategoryTypes.REQUEST_CATEGORY_LIST, getCategoryListSaga),
  takeLatest(CategoryTypes.REQUEST_CATEGORY, getCategorySaga),
  takeLatest(CategoryTypes.REMOVE_CATEGORY, removeCategorySaga),
];
