import {
  StudentTypes,
  StudentRequest,
  StudentAction,
  StudentTypeValues,
  StudentPhotoValues,
} from "../types";

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

export function setStudentPhoto(
  props: StudentPhotoValues
): StudentAction<StudentPhotoValues> {
  return {
    type: StudentTypes.SET_STUDENT_PHOTO,
    payload: { ...props },
  };
}

export function setStudent(
  props: StudentTypeValues,
  onSuccess?: () => void
): StudentAction<StudentTypeValues> {
  return {
    type: StudentTypes.SET_STUDENT,
    payload: { ...props },
    onSuccess,
  };
}

export function updateStudent(
  props: StudentTypeValues,
  onSuccess?: () => void
): StudentAction<StudentTypeValues> {
  return {
    type: StudentTypes.UPDATE_STUDENT,
    payload: { ...props },
    onSuccess,
  };
}

export function removeStudent(
  props: StudentRequest,
  onSuccess?: () => void
): StudentAction<StudentRequest> {
  return {
    type: StudentTypes.REMOVE_STUDENT,
    payload: { ...props },
    onSuccess,
  };
}
