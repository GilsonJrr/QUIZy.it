import {
  UserTypes,
  UserAction,
  UserRequest,
  UseData,
  FeedbackData,
  UseStudentData,
} from "../types";

export function requestUser(props: UserRequest): UserAction<UserRequest> {
  return {
    type: UserTypes.REQUEST_USER,
    payload: { ...props },
  };
}

export function requestTutorPhoto(props: UserRequest): UserAction<UserRequest> {
  return {
    type: UserTypes.REQUEST_TUTOR_INFO,
    payload: { ...props },
  };
}

export function requestStudentUser(
  props: UserRequest
): UserAction<UserRequest> {
  return {
    type: UserTypes.REQUEST_USER_STUDENT,
    payload: { ...props },
  };
}

export function setUser(
  props: UseData,
  onSuccess?: () => void
): UserAction<UseData> {
  return {
    type: UserTypes.SET_USER,
    payload: { ...props },
    onSuccess,
  };
}

export function setStudentUser(
  props: UseData,
  onSuccess?: () => void
): UserAction<UseData> {
  return {
    type: UserTypes.SET_USER_STUDENT,
    payload: { ...props },
    onSuccess,
  };
}

export function setStudentToUser(
  props: UseData,
  onSuccess?: () => void
): UserAction<UseData> {
  return {
    type: UserTypes.SET_STUDENT_TO_USER,
    payload: { ...props },
    onSuccess,
  };
}

export function setUserFeedback(props: FeedbackData): UserAction<FeedbackData> {
  return {
    type: UserTypes.SET_USER_FEEDBACK,
    payload: { ...props },
  };
}

export function user(props: UseData): UserAction<UseData> {
  return {
    type: UserTypes.USER,
    payload: { ...props },
  };
}

export function tutorInfo(props: UseData): UserAction<UseData> {
  return {
    type: UserTypes.TUTOR_INFO,
    payload: { ...props },
  };
}

export function userStudent(props: UseStudentData): UserAction<UseStudentData> {
  return {
    type: UserTypes.USER_STUDENT,
    payload: { ...props },
  };
}

export function cleanUpUser() {
  return {
    type: UserTypes.CLEAN_UP_USER,
  };
}
