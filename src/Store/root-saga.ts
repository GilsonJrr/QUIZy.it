import { all } from "@redux-saga/core/effects";

import authSagas from "./auth/sagas";
import exampleSagas from "./example/sagas";
import studentSagas from "./students/sagas";
import groupsSagas from "./group/sagas";

export function* rootSagas() {
  yield all([...authSagas, ...exampleSagas, ...studentSagas, ...groupsSagas]);
}
