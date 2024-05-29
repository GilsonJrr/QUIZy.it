import { ChatTypes, ChatRequest, ChatAction, ChatTypeValues } from "../types";

export function chatCleanUp() {
  return {
    type: ChatTypes.CHAT_CLEAN_UP,
  };
}

export function chatListCleanUp() {
  return {
    type: ChatTypes.CHAT_LIST_CLEAN_UP,
  };
}

export function requestChatList(props: ChatRequest): ChatAction<ChatRequest> {
  return {
    type: ChatTypes.REQUEST_CHAT_LIST,
    payload: { ...props },
  };
}

export function requestChat(props: ChatRequest): ChatAction<ChatRequest> {
  return {
    type: ChatTypes.REQUEST_CHAT,
    payload: { ...props },
  };
}

export function chatList(props: ChatTypeValues): ChatAction<ChatTypeValues> {
  return {
    type: ChatTypes.CHAT_LIST,
    payload: { ...props },
  };
}

export function chat(props: ChatTypeValues): ChatAction<ChatTypeValues> {
  return {
    type: ChatTypes.CHAT,
    payload: { ...props },
  };
}

export function setChat(props: ChatRequest): ChatAction<ChatRequest> {
  return {
    type: ChatTypes.SET_CHAT,
    payload: { ...props },
  };
}

export function removeChat(props: ChatRequest): ChatAction<ChatRequest> {
  return {
    type: ChatTypes.REMOVE_CHAT,
    payload: { ...props },
  };
}
