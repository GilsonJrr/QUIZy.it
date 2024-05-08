import {
  StudentTypes,
  StudentRequest,
  StudentAction,
  StudentTypeValues,
} from "../types";

//example function without payload
export function studentCleanUp() {
  return {
    type: StudentTypes.STUDENT_CLEAN_UP,
  };
}

export function studentListCleanUp() {
  return {
    type: StudentTypes.STUDENT_LIST_CLEAN_UP,
  };
}

export function requestStudentList(
  props: StudentRequest
): StudentAction<StudentRequest> {
  return {
    type: StudentTypes.REQUEST_STUDENT_LIST,
    payload: { ...props },
  };
}

export function requestStudent(
  props: StudentRequest
): StudentAction<StudentRequest> {
  return {
    type: StudentTypes.REQUEST_STUDENT,
    payload: { ...props },
  };
}

export function studentList(
  props: StudentTypeValues
): StudentAction<StudentTypeValues> {
  return {
    type: StudentTypes.STUDENT_LIST,
    payload: { ...props },
  };
}

export function student(
  props: StudentTypeValues
): StudentAction<StudentTypeValues> {
  return {
    type: StudentTypes.STUDENT,
    payload: { ...props },
  };
}

export function setStudent(
  props: StudentRequest
): StudentAction<StudentRequest> {
  return {
    type: StudentTypes.SET_STUDENT,
    payload: { ...props },
  };
}

export function removeStudent(
  props: StudentRequest
): StudentAction<StudentRequest> {
  return {
    type: StudentTypes.REMOVE_STUDENT,
    payload: { ...props },
  };
}
