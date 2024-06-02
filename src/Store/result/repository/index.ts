import { database } from "lib/firebase";
import {
  ref,
  set,
  get,
  remove,
  orderByChild,
  equalTo,
  query,
} from "firebase/database";

import { ResultTypeValues } from "../types";

export const getResultList = async (uid: string, studentUid?: string) => {
  const queryRef = ref(database, `results/${uid}`);
  const quizQuery = studentUid
    ? query(queryRef, orderByChild("studentUid"), equalTo(studentUid))
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

export const getResult = async (
  uid: string,
  studentId: string,
  quizUid: string
) => {
  return get(
    // ref(database, `user/${uid}/quiz/${studentId}/results/${studentId}/`)
    ref(database, `results/${uid}/${quizUid}_${studentId}`)
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
      // `user/${data.tutorUid}/quiz/${data.quizUid}/results/${data.studentUid}/`
      `results/${data.tutorUid}/${data.quizUid}_${data.studentUid}`
    ),
    rest
  )
    .then((results) => results)
    .catch((err) => {
      throw new Error(err);
    });
};

export const removeStudentResult = async (uid: string, studentUid: string) => {
  const queryRef = ref(database, `results/${uid}`);
  const quizQuery = query(
    queryRef,
    orderByChild("studentUid"),
    equalTo(studentUid)
  );

  return get(quizQuery)
    .then((snapshot) => {
      const removePromises: Promise<void>[] = [];
      snapshot.forEach((childSnapshot) => {
        removePromises.push(
          remove(ref(database, `results/${uid}/${childSnapshot.key}`))
        );
      });
      return Promise.all(removePromises);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const removeQuizResult = async (uid: string, quizUid: string) => {
  const queryRef = ref(database, `results/${uid}`);
  const quizQuery = query(queryRef, orderByChild("quizUid"), equalTo(quizUid));

  return get(quizQuery)
    .then((snapshot) => {
      const removePromises: Promise<void>[] = [];
      snapshot.forEach((childSnapshot) => {
        removePromises.push(
          remove(ref(database, `results/${uid}/${childSnapshot.key}`))
        );
      });
      return Promise.all(removePromises);
    })
    .catch((err) => {
      throw new Error(err);
    });
};
