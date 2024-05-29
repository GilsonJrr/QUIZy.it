import { database } from "lib/firebase";
import {
  ref,
  set,
  get,
  remove,
  onValue,
  query,
  orderByKey,
  limitToFirst,
} from "firebase/database";

import { ChatTypeValues } from "../types";

export const subscribeToChatList = (
  uid: string,
  studentId: string,
  callback: (chat: any[]) => void
) => {
  const unsubscribe = onValue(
    ref(database, `user/${uid}/students/${studentId}/chat`),
    (snapshot) => {
      const chat: any[] = [];
      snapshot.forEach((childSnapshot) => {
        chat.push(childSnapshot.val());
      });
      callback(chat);
    }
  );

  return unsubscribe;
};

export const getChatList = async (uid: string, studentId: string) => {
  return get(ref(database, `user/${uid}/students/${studentId}/chat`))
    .then((chats) => chats.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const getChat = async (
  uid: string,
  studentId: string,
  chatId: string
) => {
  get(ref(database, `user/${uid}/students/${studentId}/chat/${chatId}/`))
    .then((chats) => chats.val())
    .catch((err) => {
      throw new Error(err);
    });
  return;
};

export const setChat = async (_uid: string, data: ChatTypeValues) => {
  const {
    tutorUid,
    studentUid,
    chatUid,
    newStudentChat,
    newTutorChat,
    ...rest
  } = data;

  const chatRef = ref(
    database,
    `user/${tutorUid}/students/${studentUid}/chat/`
  );

  try {
    const snapshot = await get(chatRef);
    const chats = snapshot.val();
    const chatKeys = Object.keys(chats || {});

    if (chatKeys.length >= 100) {
      const oldestChatsQuery = query(
        chatRef,
        orderByKey(),
        limitToFirst(chatKeys.length - 99)
      );
      const oldestChatsSnapshot = await get(oldestChatsQuery);
      const oldestChats = oldestChatsSnapshot.val();

      for (const key in oldestChats) {
        await remove(
          ref(database, `user/${tutorUid}/students/${studentUid}/chat/${key}`)
        );
      }
    }
    await set(
      ref(database, `user/${tutorUid}/students/${studentUid}/chat/${chatUid}/`),
      { chatUid: chatUid, ...rest }
    );
  } catch (err) {
    // throw new Error(err);
  }

  return;
};

export const removeChat = async (
  uid: string,
  studentId: string,
  chatId: string
) => {
  return remove(
    ref(database, `user/${uid}/students/${studentId}/chat/${chatId}/`)
  )
    .then((chats) => chats)
    .catch((err) => {
      throw new Error(err);
    });
};
