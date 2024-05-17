import { database } from "lib/firebase";
import { deleteUser } from "firebase/auth";
// import { auth } from "lib/firebase";
import { ref, set, get, query, limitToFirst, remove } from "firebase/database";

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

export const updateStudent = async (data: StudentTypeValues) => {
  return set(ref(database, `student/${data.uid}/info`), data)
    .then((students) => students)
    .catch((err) => {
      throw new Error(err);
    });
};

export const updateStudentList = async (data: StudentTypeValues) => {
  return set(
    ref(database, `user/${data.tutorID}/students/${data.uid}/info`),
    data
  )
    .then((students) => students)
    .catch((err) => {
      throw new Error(err);
    });
};

export const removeStudent = async (uid: string, studentId: string) => {
  return remove(ref(database, `user/${uid}/students/${studentId}`))
    .then((students) => students)
    .catch((err) => {
      throw new Error(err);
    });
};

export const removeStudentUser = async (uid: string) => {
  return remove(ref(database, `student/${uid}`))
    .then((students) => students)
    .catch((err) => {
      throw new Error(err);
    });
};

export const removeStudentUserAccount = async (uid: any) => {
  try {
    await deleteUser(uid);
    console.log("Successfully deleted user");
  } catch (error) {
    // console.log("Error deleting user:", error.message);
  }
};
