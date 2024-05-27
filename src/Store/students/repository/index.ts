import { database, storage } from "lib/firebase";
import { deleteUser } from "firebase/auth";
import { ref, set, get, query, limitToFirst, remove } from "firebase/database";
import {
  ref as refStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

import { ImageType, StudentTypeValues, UploadResult } from "../types";

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

// export const setImgProfile = (data: StudentPhotoValues) => {
//   const { photo, studentUid, tutorUid } = data;
//   const storageRef = refStorage(
//     storage,
//     `user/${tutorUid}/student/${studentUid}/info/studentProfile`
//   );

//   const uploadTask = uploadBytesResumable(
//     storageRef,
//     photo as Blob | Uint8Array | ArrayBuffer
//   );

//   uploadTask?.on(
//     "state_changed",
//     (error) => {
//       console.log(error);
//     },
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then(
//         (downloadURL) => downloadURL
//       );
//     }
//   );
// };

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

export const setImgProfile = (data: ImageType): Promise<UploadResult> => {
  const { tutorUid, studentUid, image } = data;
  const storageRef = refStorage(
    storage,
    `user/${tutorUid}/student/${studentUid}/info/studentProfile`
  );

  const uploadTask = uploadBytesResumable(
    storageRef,
    image as unknown as Blob | Uint8Array | ArrayBuffer
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
