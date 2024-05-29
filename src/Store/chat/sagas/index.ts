import { takeLatest, put, call, take, cancelled } from "redux-saga/effects";

import { chat, chatList } from "../actions";

import {
  getChat,
  getChatList,
  setChat,
  removeChat,
  subscribeToChatList,
} from "../repository";

import { ChatAction, ChatRequest, ChatTypeValues, ChatTypes } from "../types";
import { eventChannel } from "redux-saga";

//CHAT
function createChatListChannel(uid: string, studentId: string) {
  return eventChannel((emit) => {
    const unsubscribe = subscribeToChatList(uid, studentId, (quizzes) => {
      emit(quizzes);
    });
    return () => unsubscribe();
  });
}

export function* getChatListSaga(props: ChatAction<ChatRequest>): any {
  const uid = props.payload.tutorUid;
  const studentUid = props.payload.studentUid;

  const quizListChannel = yield call(
    createChatListChannel,
    uid || "",
    studentUid || ""
  );
  try {
    while (true) {
      const quizResponses = yield take(quizListChannel);
      yield put(chatList(quizResponses));
    }
  } finally {
    if (yield cancelled()) {
      quizListChannel.close();
    }
  }
}

export function* getChatSaga(props: ChatAction<ChatRequest>): any {
  const uid = props.payload.tutorUid;
  const chatId = props.payload.chatUid || "";
  const studentUid = props.payload.studentUid;

  try {
    if (uid && studentUid) {
      const chatResponses = yield call(getChat, uid, studentUid, chatId);
      yield put(chat(chatResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* setChatSaga(props: ChatAction<ChatTypeValues>): any {
  const uid = props.payload.tutorUid;
  const payload = props.payload;
  const studentUid = props.payload.studentUid;

  try {
    if (uid && payload && studentUid) {
      yield call(setChat, uid, payload);
      const chatResponses = yield call(getChatList, uid, studentUid);
      yield put(chatList(chatResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

export function* removeChatSaga(props: ChatAction<ChatRequest>): any {
  const chatId = props.payload.chatUid;
  const uid = props.payload.tutorUid;
  const studentUid = props.payload.studentUid;

  try {
    if (chatId && uid && studentUid) {
      yield call(removeChat, uid, studentUid, chatId);
      const chatResponses = yield call(getChatList, uid, studentUid);
      yield put(chatList(chatResponses));
    }
  } catch (err: any) {
    yield put(err);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(ChatTypes.SET_CHAT, setChatSaga),
  takeLatest(ChatTypes.REQUEST_CHAT_LIST, getChatListSaga),
  takeLatest(ChatTypes.REQUEST_CHAT, getChatSaga),
  takeLatest(ChatTypes.REMOVE_CHAT, removeChatSaga),
];
