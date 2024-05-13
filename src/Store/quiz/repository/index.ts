import { database } from "lib/firebase";
import {
  ref,
  set,
  get,
  remove,
  orderByChild,
  query,
  equalTo,
  limitToFirst,
} from "firebase/database";

import { QuizTypeValues } from "../types";

export const getQuizList = async (
  uid: string,
  category?: string,
  size?: number
) => {
  const queryRef = ref(database, `user/${uid}/quiz`);
  const quizQuery = category
    ? query(queryRef, orderByChild("category"), equalTo(category))
    : size
    ? query(queryRef, limitToFirst(size))
    : query(queryRef);

  return get(quizQuery)
    .then((snapshot) => {
      const quizzes: any[] = [];
      snapshot.forEach((childSnapshot) => {
        quizzes.push(childSnapshot.val());
      });
      return quizzes;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const getQuiz = async (uid: string, quizId: string) => {
  return get(ref(database, `user/${uid}/quiz/${quizId}`))
    .then((quiz) => quiz.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const setQuiz = async (_uid: string, data: QuizTypeValues) => {
  const { uid, ...rest } = data;
  return set(ref(database, `user/${_uid}/quiz/${data.id}`), rest)
    .then((quiz) => quiz)
    .catch((err) => {
      throw new Error(err);
    });
};

export const removeQuiz = async (uid: string, studentId: string) => {
  return remove(ref(database, `user/${uid}/quiz/${studentId}`))
    .then((quiz) => quiz)
    .catch((err) => {
      throw new Error(err);
    });
};
