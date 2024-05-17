export enum UserTypes {
  REQUEST_USER = "REQUEST_USER",
  REQUEST_USER_STUDENT = "REQUEST_USER_STUDENT",
  USER = "USER",
  USER_STUDENT = "USER_STUDENT",
  CLEAN_UP_USER = "CLEAN_UP_USER",
  SET_USER = "SET_USER",
  SET_USER_STUDENT = "SET_USER_STUDENT",
  SET_USER_FEEDBACK = "SET_USER_FEEDBACK",
  SET_STUDENT_TO_USER = "SET_STUDENT_TO_USER",
}

export type UserState = {
  isLoading: boolean;
  user: UseData | undefined;
  userStudent: UseStudentData | undefined;
};

export type UserAction<Payload> = {
  type: UserTypes;
  payload: Payload;
  onSuccess?: () => void;
};

export type UserRequest = {
  uid: string;
};

export type Info = {
  email: string;
  name: string;
  phone: string;
  uid: string;
  userType: string;
  tutorID: string;
  group?: string;
  about?: string;
  birthDate?: string;
  socialNetWork?: string;
  photo?: string;
  average?: string;
  address?: string;
};

export type UseStudentData = {
  uid?: string;
  tutorID?: string;
  userType?: string;
};

export type UseData = {
  email: string;
  name: string;
  phone?: string;
  uid?: string;
  userType?: string;
  tutorID?: string;
  group?: string;
  about?: string;
  birthDate?: string;
  socialNetWork?: string;
  photo?: string;
  average?: string;
  onSuccess?: () => void;
  //***/
  info?: Info;
  //adicionar os outros campos
};

export type FeedbackData = {
  uid: string;
  subject: string;
  body: string;
  feedbackID: string;
};
