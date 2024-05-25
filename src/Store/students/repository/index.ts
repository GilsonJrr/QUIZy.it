import { database, storage } from "lib/firebase";
import { deleteUser } from "firebase/auth";
import { ref, set, get, query, limitToFirst, remove } from "firebase/database";
import {
  ref as refStorage,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";

import { StudentPhotoValues, StudentTypeValues } from "../types";

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

export const getImgProfile = async (data: StudentPhotoValues) => {
  const { studentUid, tutorUid } = data;
  const storage = getStorage();
  const storageRef = refStorage(
    storage,
    `user/${tutorUid}/student/${studentUid}/info/studentProfile`
  );
  return getDownloadURL(storageRef)
    .then((downloadURL) => {
      return downloadURL;
    })
    .catch((error) => {
      console.error("Error getting profile image:", error);
      return null;
    });
};

export const setImgProfile = (data: StudentPhotoValues) => {
  const { photo, studentUid, tutorUid } = data;
  const storageRef = refStorage(
    storage,
    `user/${tutorUid}/student/${studentUid}/info/studentProfile`
  );

  const uploadTask = uploadBytesResumable(
    storageRef,
    photo as Blob | Uint8Array | ArrayBuffer
  );

  uploadTask?.on(
    "state_changed",
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL) => downloadURL
      );
    }
  );
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
  } catch (error) {}
};
