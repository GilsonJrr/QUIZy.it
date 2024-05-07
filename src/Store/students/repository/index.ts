import { database } from "lib/firebase";
import { ref, set, get, query, limitToFirst } from "firebase/database";

import { StudentTypeValues } from "../types";

export const getStudentList = async (uid: string, limit?: number) => {
  let recentPostsRef;

  if (limit) {
    recentPostsRef = query(
      ref(database, `user/${uid}/students/`),
      limitToFirst(limit)
    );
  } else {
    recentPostsRef = query(ref(database, `user/${uid}/students/`));
  }

  return get(recentPostsRef)
    .then((students) => students.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const getStudent = async (uid: string, studentId: string) => {
  return get(ref(database, `user/${uid}/students/${studentId}`))
    .then((students) => students.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const setStudent = async (_uid: string, data: StudentTypeValues) => {
  const { uid, ...rest } = data;
  return set(ref(database, `user/${_uid}/students/${data.id}`), rest)
    .then((students) => students)
    .catch((err) => {
      throw new Error(err);
    });
};
