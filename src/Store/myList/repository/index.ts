import { database } from "lib/firebase";
import { ref, set, get, remove } from "firebase/database";

import { MyListTypeValues } from "../types";

export const getMyListList = async (uid: string, studentId: string) => {
  return get(ref(database, `user/${uid}/students/${studentId}/myLists`))
    .then((myLists) => myLists.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const getMyList = async (
  uid: string,
  studentId: string,
  myListId: string
) => {
  return get(
    ref(database, `user/${uid}/students/${studentId}/myLists/${myListId}/`)
  )
    .then((myLists) => myLists.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const setMyList = async (_uid: string, data: MyListTypeValues) => {
  const { quizUid } = data;
  return set(
    ref(
      database,
      `user/${data.tutorUid}/students/${data.studentUid}/myLists/${data.quizUid}/`
    ),
    quizUid
  )
    .then((myLists) => myLists)
    .catch((err) => {
      throw new Error(err);
    });
};

export const removeMyList = async (
  uid: string,
  studentId: string,
  myListId: string
) => {
  return remove(
    ref(database, `user/${uid}/students/${studentId}/myLists/${myListId}/`)
  )
    .then((myLists) => myLists)
    .catch((err) => {
      throw new Error(err);
    });
};
