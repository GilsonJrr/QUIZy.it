import { ResultTypeValues } from "Store/result/types";

export enum StudentTypes {
  STUDENT_CLEAN_UP = "STUDENT_CLEAN_UP",
  STUDENT_LIST_CLEAN_UP = "STUDENT_LIST_CLEAN_UP",
  SET_STUDENT = "SET_STUDENT",
  REQUEST_STUDENT_LIST = "REQUEST_STUDENT_LIST",
  REQUEST_STUDENT = "REQUEST_STUDENT",
  STUDENT_LIST = "STUDENT_LIST",
  STUDENT = "STUDENT",
  REMOVE_STUDENT = "REMOVE_STUDENT",
  UPDATE_STUDENT = "UPDATE_STUDENT",
  SET_STUDENT_PHOTO = "SET_STUDENT_PHOTO",
}

export type StudentAction<Payload> = {
  type: StudentTypes;
  payload: Payload;
  onSuccess?: () => void;
};

export type StudentRequest = {
  uid: string;
  studentId?: string;
  limit?: number;
  onSuccess?: () => void;
};

export type TInfo = {
  id?: string;
  uid?: string;
  name: string;
  phone?: string;
  email: string;
  group?: string;
  about?: string;
  birthDate?: string;
  socialNetWork?: string;
  tutorID?: string;
  photo?: string;
  average?: string;
  userType?: string;
  address?: string;
  onSuccess?: () => void;
};

export type StudentPhotoValues = {
  studentUid?: string;
  tutorUid?: string;
  photo?: string | Blob | Uint8Array | ArrayBuffer;
};

export type StudentTypeValues = {
  id?: string;
  uid?: string;
  name: string;
  phone?: string;
  email: string;
  group?: string;
  about?: string;
  birthDate?: string;
  socialNetWork?: string;
  tutorID?: string;
  photo?: string;
  average?: string;
  address?: string;
  onSuccess?: () => void;
  //TODO: change here

  info?: TInfo;
  results?: ResultTypeValues[];
};

export type PhotoType = {
  uid: string;
  photo: string;
};

export type StudentState = {
  isLoading: boolean;
  error: string | undefined;
  students: StudentTypeValues[] | undefined;
  student: StudentTypeValues | undefined;
  photoLoading: boolean;
};
