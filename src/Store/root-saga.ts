import { all } from "@redux-saga/core/effects";

import authSagas from "./auth/sagas";
import exampleSagas from "./example/sagas";

export function* rootSagas() {
  yield all([...authSagas, ...exampleSagas]);
}
