import { all } from "@redux-saga/core/effects";

import authSagas from "./auth/sagas";
import exampleSagas from "./example/sagas";
import studentSagas from "./students/sagas";
import groupsSagas from "./group/sagas";
import userSagas from "./user/sagas";
import categorySagas from "./category/sagas";
import quizSagas from "./quiz/sagas";
import resultSagas from "./result/sagas";
import myListSagas from "./myList/sagas";

export function* rootSagas() {
  yield all([
    ...authSagas,
    ...exampleSagas,
    ...studentSagas,
    ...groupsSagas,
    ...userSagas,
    ...categorySagas,
    ...quizSagas,
    ...resultSagas,
    ...myListSagas,
  ]);
}
