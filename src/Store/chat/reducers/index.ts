import { Reducer } from "redux";
import { ChatTypeValues, ChatTypes, ChatState } from "../types";

interface CleanUpChat {
  type: ChatTypes.CHAT_CLEAN_UP;
}
interface CleanUpChatList {
  type: ChatTypes.CHAT_LIST_CLEAN_UP;
}

interface SetChat {
  type: ChatTypes.SET_CHAT;
  payload: ChatTypeValues[];
}

interface RemoveChat {
  type: ChatTypes.REMOVE_CHAT;
}

interface requestChatList {
  type: ChatTypes.REQUEST_CHAT_LIST;
  payload: ChatTypeValues[];
}

interface ChatList {
  type: ChatTypes.CHAT_LIST;
  payload: ChatTypeValues[];
}

interface requestChat {
  type: ChatTypes.REQUEST_CHAT;
  payload: ChatTypeValues;
}

interface CHAT {
  type: ChatTypes.CHAT;
  payload: ChatTypeValues;
}

type ChatAction =
  | CleanUpChat
  | CleanUpChatList
  | SetChat
  | requestChatList
  | requestChat
  | ChatList
  | CHAT
  | RemoveChat;

const chatInitialState: ChatState = {
  isLoading: false,
  chats: undefined,
  chat: undefined,
  error: undefined,
};

const chatReducer: Reducer<ChatState, ChatAction> = (
  state = chatInitialState,
  action
) => {
  switch (action.type) {
    case ChatTypes.CHAT_CLEAN_UP: {
      return {
        ...state,
        error: undefined,
        payload: undefined,
        chat: undefined,
      };
    }
    case ChatTypes.CHAT_LIST_CLEAN_UP: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        payload: undefined,
        chats: undefined,
      };
    }
    case ChatTypes.REQUEST_CHAT_LIST: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        chats: undefined,
      };
    }
    case ChatTypes.REQUEST_CHAT: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        chat: undefined,
      };
    }
    case ChatTypes.CHAT: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        chat: action.payload,
      };
    }
    case ChatTypes.CHAT_LIST: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        chats: Object.values(action.payload),
      };
    }
    case ChatTypes.SET_CHAT: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        chats: action.payload,
        newMessage: false,
      };
    }
    case ChatTypes.REMOVE_CHAT: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export { chatReducer };
