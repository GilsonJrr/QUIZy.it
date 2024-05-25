import { database, storage } from "lib/firebase";
import { UploadResult, UseData, UserPhoto } from "../types";
import { ref, set, get } from "firebase/database";
import {
  ref as refStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

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

export const setStudentUser = async (_uid: string, data: UseData) => {
  const { uid, tutorID, userType } = data;
  return set(ref(database, `student/${_uid}`), { uid, tutorID, userType })
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

export const setImgUser = (data: UserPhoto): Promise<UploadResult> => {
  const { uid, photo } = data;

  const storageRef = refStorage(storage, `user/${uid}/info/`);

  const uploadTask = uploadBytesResumable(
    storageRef,
    photo as unknown as Blob | Uint8Array | ArrayBuffer
  );

  let loading = true;
  let pic = "";
  let error: string | null = null;

  return new Promise((resolve) => {
    uploadTask.on(
      "state_changed",
      null,
      (uploadError) => {
        console.log(uploadError);
        loading = false;
        error = uploadError.message;
        resolve({ pic, loading, error });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            pic = downloadURL;
            loading = false;
            resolve({ pic, loading, error });
          })
          .catch((urlError) => {
            console.error(urlError);
            loading = false;
            error = urlError.message;
            resolve({ pic, loading, error });
          });
      }
    );
  });
};

export const setImgStudent = (data: UserPhoto): Promise<UploadResult> => {
  const { uid, photo, tutorUid } = data;

  const storageRef = refStorage(
    storage,
    `user/${tutorUid}/students/${uid}/info`
  );

  const uploadTask = uploadBytesResumable(
    storageRef,
    photo as unknown as Blob | Uint8Array | ArrayBuffer
  );

  let loading = true;
  let pic = "";
  let error: string | null = null;

  return new Promise((resolve) => {
    uploadTask.on(
      "state_changed",
      null,
      (uploadError) => {
        console.log(uploadError);
        loading = false;
        error = uploadError.message;
        resolve({ pic, loading, error });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            pic = downloadURL;
            loading = false;
            resolve({ pic, loading, error });
          })
          .catch((urlError) => {
            console.error(urlError);
            loading = false;
            error = urlError.message;
            resolve({ pic, loading, error });
          });
      }
    );
  });
};
