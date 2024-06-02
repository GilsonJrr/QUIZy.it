import { takeLatest, put, call, take, cancelled } from "redux-saga/effects";

import { quiz, quizList, quizListCategory } from "../actions";

import {
  getQuiz,
  getQuizList,
  setQuiz,
  removeQuiz,
  subscribeToQuizList,
  deleteImgQuiz,
} from "../repository";

import { QuizAction, QuizRequest, QuizTypeValues, QuizTypes } from "../types";
import { eventChannel } from "redux-saga";
import { removeQuizResult } from "Store/result/actions";

//Quiz
function createQuizListChannel(uid: string) {
  return eventChannel((emit) => {
    const unsubscribe = subscribeToQuizList(uid, (quizzes) => {
      emit(quizzes);
    });

    // The subscriber must return an unsubscribe function
    return () => unsubscribe();
  });
}

export function* getQuizListSaga(props: QuizAction<QuizRequest>): any {
  const uid = props.payload.uid;

  if (uid) {
    const quizListChannel = yield call(createQuizListChannel, uid);
    try {
      while (true) {
        const quizResponses = yield take(quizListChannel);
        yield put(quizList(quizResponses));
      }
    } finally {
      if (yield cancelled()) {
        quizListChannel.close();
      }
    }
  }
}

export function* getQuizListCategorySaga(props: QuizAction<QuizRequest>): any {
  const uid = props.payload.uid;
  const category = props.payload.category;
  try {
    if (uid) {
      const quizResponses = yield call(getQuizList, uid, category);
      yield put(quizListCategory(quizResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* getQuizSaga(props: QuizAction<QuizRequest>): any {
  const uid = props.payload.uid;
  const quizId = props.payload.quizId || "";

  try {
    if (uid) {
      const quizResponses = yield call(getQuiz, uid, quizId);
      yield put(quiz(quizResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* setQuizSaga(props: QuizAction<QuizTypeValues>): any {
  const uid = props.payload.uid;
  const payload = props.payload;
  const onSuccess = props.onSuccess;

  try {
    if (uid && payload) {
      yield call(setQuiz, uid, payload);

      const quizListChannel = yield call(createQuizListChannel, uid);
      yield put(() => onSuccess?.());
      try {
        while (true) {
          const quizResponses = yield take(quizListChannel);
          yield put(quizList(quizResponses));
        }
      } finally {
        if (yield cancelled()) {
          quizListChannel.close();
        }
      }
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* removeQuizSaga(props: QuizAction<QuizRequest>): any {
  const quizId = props.payload.quizId;
  const uid = props.payload.uid;
  const onSuccess = props.onSuccess;

  try {
    if (quizId && uid) {
      yield call(removeQuiz, uid, quizId);
      yield call(deleteImgQuiz, { uid: uid, id: quizId });
      yield put(removeQuizResult({ uid: uid, quizUid: quizId }));
      const quizResponses = yield call(getQuizList, uid);
      yield put(quizList(quizResponses));
      yield put(() => onSuccess?.());
    }
  } catch (err: any) {
    yield put(err);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(QuizTypes.SET_QUIZ, setQuizSaga),
  takeLatest(QuizTypes.REQUEST_QUIZ_LIST, getQuizListSaga),
  takeLatest(QuizTypes.REQUEST_QUIZ, getQuizSaga),
  takeLatest(QuizTypes.REMOVE_QUIZ, removeQuizSaga),
  takeLatest(QuizTypes.REQUEST_QUIZ_LIST_CATEGORY, getQuizListCategorySaga),
];
