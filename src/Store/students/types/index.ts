export enum StudentTypes {
  STUDENT_CLEAN_UP = "STUDENT_CLEAN_UP",
  SET_STUDENT = "SET_STUDENT",
  REQUEST_STUDENT_LIST = "REQUEST_STUDENT_LIST",
  REQUEST_STUDENT = "REQUEST_STUDENT",
  STUDENT_LIST = "STUDENT_LIST",
  STUDENT = "STUDENT",
}

export type StudentAction<Payload> = {
  type: StudentTypes;
  payload: Payload;
};

export type StudentRequest = {
  uid: string;
  studentId?: string;
  limit?: number;
};

export type StudentTypeValues = {
  id?: string;
  uid?: string;
  name: string;
  phone: string;
  email: string;
  group?: string;
  about?: string;
  birthDate?: string;
  socialNetWork?: string;
  photo?: string;
  average?: string;
};

export type StudentState = {
  isLoading: boolean;
  error: string | undefined;
  students: StudentTypeValues[] | undefined;
  student: StudentTypeValues | undefined;
};
