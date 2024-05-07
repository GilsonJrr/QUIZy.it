import { all } from "@redux-saga/core/effects";

import authSagas from "./auth/sagas";
import exampleSagas from "./example/sagas";
import studentSagas from "./students/sagas";

export function* rootSagas() {
  yield all([...authSagas, ...exampleSagas, ...studentSagas]);
}
