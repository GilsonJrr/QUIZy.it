export enum ChatTypes {
  CHAT_CLEAN_UP = "CHAT_CLEAN_UP",
  CHAT_LIST_CLEAN_UP = "CHAT_LIST_CLEAN_UP",
  SET_CHAT = "SET_CHAT",
  SET_OPEN_STUDENT_CHAT = "SET_OPEN_STUDENT_CHAT",
  REQUEST_CHAT_LIST = "REQUEST_CHAT_LIST",
  REQUEST_CHAT = "REQUEST_CHAT",
  CHAT_LIST = "CHAT_LIST",
  CHAT = "CHAT",
  REMOVE_CHAT = "REMOVE_CHAT",
}

export type ChatAction<Payload> = {
  type: ChatTypes;
  payload: Payload;
};

export type ChatRequest = {
  tutorUid: string;
  studentUid?: string;
  chatUid?: string;
  newStudentChat?: boolean;
  newTutorChat?: boolean;
};

export type ChatTypeValues = {
  tutorUid?: string;
  studentUid?: string;
  chatUid?: string;
  message?: string;
  from?: string;
  date?: string;
  read?: boolean;
  newStudentChat?: boolean;
  newTutorChat?: boolean;
};

export type ChatState = {
  isLoading: boolean;
  error: string | undefined;
  chats: ChatTypeValues[] | undefined;
  chat: ChatTypeValues | undefined;
};
