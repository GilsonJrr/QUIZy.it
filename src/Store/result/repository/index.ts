import { database } from "lib/firebase";
import { ref, set, get, remove } from "firebase/database";

import { ResultTypeValues } from "../types";

export const getResultList = async (uid: string, studentId: string) => {
  return get(ref(database, `user/${uid}/students/${studentId}/results`))
    .then((results) => results.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const getResult = async (
  uid: string,
  studentId: string,
  resultId: string
) => {
  return get(
    ref(database, `user/${uid}/students/${studentId}/results/${resultId}/`)
  )
    .then((results) => results.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const setResult = async (_uid: string, data: ResultTypeValues) => {
  const { uid, ...rest } = data;
  return set(
    ref(
      database,
      `user/${data.tutorUid}/students/${data.studentUid}/results/${data.quizUid}/`
    ),
    rest
  )
    .then((results) => results)
    .catch((err) => {
      throw new Error(err);
    });
};

export const removeResult = async (
  uid: string,
  studentId: string,
  resultId: string
) => {
  return remove(
    ref(database, `user/${uid}/students/${studentId}/results/${resultId}/`)
  )
    .then((results) => results)
    .catch((err) => {
      throw new Error(err);
    });
};
