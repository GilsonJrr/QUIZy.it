export enum UserTypes {
  REQUEST_USER = "REQUEST_USER",
  USER = "USER",
  CLEAN_UP_USER = "CLEAN_UP_USER",
  SET_USER = "SET_USER",
  SET_USER_STUDENT = "SET_USER_STUDENT",
  SET_USER_FEEDBACK = "SET_USER_FEEDBACK",
  SET_STUDENT_TO_USER = "SET_STUDENT_TO_USER",
}

export type UserState = {
  isLoading: boolean;
  user: UseData | undefined;
};

export type UserAction<Payload> = {
  type: UserTypes;
  payload: Payload;
};

export type UserRequest = {
  uid: string;
};

export type Info = {
  email: string;
  name: string;
  age: string;
  phone: string;
  uid: string;
  userType: string;
  tutorID: string;
};

export type UseData = {
  email: string;
  name: string;
  age: string;
  phone: string;
  uid: string;
  userType: string;
  tutorID: string;
  info?: Info;
  //adicionar os outros campos
};

export type FeedbackData = {
  uid: string;
  subject: string;
  body: string;
  feedbackID: string;
};
