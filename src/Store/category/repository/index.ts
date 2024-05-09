import { database } from "lib/firebase";
import { ref, set, get, remove } from "firebase/database";

import { CategoryTypeValues } from "../types";

export const getCategoryList = async (uid: string) => {
  return get(ref(database, `user/${uid}/category/`))
    .then((category) => category.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const getCategory = async (uid: string, studentId: string) => {
  return get(ref(database, `user/${uid}/category/${studentId}`))
    .then((category) => category.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const setCategory = async (_uid: string, data: CategoryTypeValues) => {
  const { uid, ...rest } = data;
  return set(ref(database, `user/${_uid}/category/${data.id}`), rest)
    .then((category) => category)
    .catch((err) => {
      throw new Error(err);
    });
};

export const removeCategory = async (uid: string, studentId: string) => {
  return remove(ref(database, `user/${uid}/category/${studentId}`))
    .then((category) => category)
    .catch((err) => {
      throw new Error(err);
    });
};
