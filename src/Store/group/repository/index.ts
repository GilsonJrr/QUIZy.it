import { database } from "lib/firebase";
import { ref, set, get, remove } from "firebase/database";

import { GroupTypeValues } from "../types";

export const getGroupList = async (uid: string) => {
  return get(ref(database, `groups/${uid}`))
    .then((groups) => groups.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const getGroup = async (uid: string, studentId: string) => {
  return get(ref(database, `groups/${uid}/${studentId}`))
    .then((groups) => groups.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const setGroup = async (_uid: string, data: GroupTypeValues) => {
  const { uid, ...rest } = data;
  return set(ref(database, `groups/${_uid}/${data.id}`), rest)
    .then((groups) => groups)
    .catch((err) => {
      throw new Error(err);
    });
};

export const removeGroup = async (uid: string, studentId: string) => {
  return remove(ref(database, `groups/${uid}/${studentId}`))
    .then((groups) => groups)
    .catch((err) => {
      throw new Error(err);
    });
};
