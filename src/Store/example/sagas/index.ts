import { takeLatest, put, call } from "redux-saga/effects";

import { exampleFunction02 } from "../actions";

import { getExample, setExample } from "../repository";

import { ExampleTypes, ExampleAction, ExampleTypeValues } from "../types";

//agenda
export function* exampleSaga(props: ExampleAction<ExampleTypeValues>): any {
  // Destructure props to extract uid and payload
  const uid = props.payload.uid;
  const payload = props.payload;

  try {
    // Check if both uid and payload exist
    if (uid && payload) {
      // Call setExample function with uid and payload as arguments
      yield call(setExample, uid, payload);

      // Call getExample function with uid as an argument
      const userExampleResponses = yield call(getExample, uid);

      // Dispatch userExample action with response from getExample as payload
      yield put(exampleFunction02(userExampleResponses));
    }
  } catch (err: any) {
    // Error handling, if any error occurs during the execution
    // Uncomment and replace the line below to handle the error appropriately
    // yield put(authError('cannot sign In'));
  }
}

export default [takeLatest(ExampleTypes.EXAMPLE, exampleSaga)];
