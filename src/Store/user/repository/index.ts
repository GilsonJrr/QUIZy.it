import { database } from "lib/firebase";
import { UseData } from "../types";
import { ref, set, get } from "firebase/database";

export const getUser = async (uid: string) => {
  return get(ref(database, `user/${uid}`))
    .then((user) => user.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const getUserStudent = async (uid: string) => {
  return get(ref(database, `student/${uid}`))
    .then((user) => user.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const setUser = async (uid: string, data: UseData) => {
  return set(ref(database, `user/${uid || data.uid}/info`), data)
    .then((user) => user)
    .catch((err) => {
      throw new Error(err);
    });
};

export const setStudentUser = async (uid: string, data: UseData) => {
  return set(ref(database, `student/${uid}/info`), data)
    .then((user) => user)
    .catch((err) => {
      throw new Error(err);
    });
};

export const setNewStudent = async (uid: string, data: UseData) => {
  return set(ref(database, `user/${uid}/students/${data.uid}/info`), data)
    .then((user) => user)
    .catch((err) => {
      throw new Error(err);
    });
};
