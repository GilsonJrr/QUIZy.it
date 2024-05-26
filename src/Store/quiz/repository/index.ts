import { database, storage } from "lib/firebase";
import {
  ref,
  set,
  get,
  remove,
  orderByChild,
  query,
  equalTo,
  limitToFirst,
  onValue,
} from "firebase/database";

import { ImageType, QuizTypeValues, UploadResult } from "../types";
import {
  ref as refStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

export const subscribeToQuizList = (
  uid: string,
  callback: (quizzes: any[]) => void
) => {
  const unsubscribe = onValue(ref(database, `user/${uid}/quiz`), (snapshot) => {
    const quizzes: any[] = [];
    snapshot.forEach((childSnapshot) => {
      quizzes.push(childSnapshot.val());
    });
    callback(quizzes);
  });

  // Return a function to unsubscribe
  return unsubscribe;
};

export const getQuizList = async (
  uid: string,
  category?: string,
  size?: number
) => {
  const queryRef = ref(database, `user/${uid}/quiz`);
  const quizQuery = category
    ? query(queryRef, orderByChild("category"), equalTo(category))
    : size
    ? query(queryRef, limitToFirst(size))
    : query(queryRef, orderByChild("date"));

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

export const getQuiz = async (uid: string, quizId: string) => {
  return get(ref(database, `user/${uid}/quiz/${quizId}`))
    .then((quiz) => quiz.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const setQuiz = async (_uid: string, data: QuizTypeValues) => {
  const { uid, ...rest } = data;
  return set(ref(database, `user/${_uid}/quiz/${data.id}`), rest)
    .then((quiz) => quiz)
    .catch((err) => {
      throw new Error(err);
    });
};

export const removeQuiz = async (uid: string, studentId: string) => {
  return remove(ref(database, `user/${uid}/quiz/${studentId}`))
    .then((quiz) => quiz)
    .catch((err) => {
      throw new Error(err);
    });
};

export const setImgQuiz = (data: ImageType): Promise<UploadResult> => {
  const { uid, id, image } = data;
  const storageRef = refStorage(storage, `user/${uid}/quiz/${id}/`);

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
