export enum AlertTypes {
  ALERT_CLEAN_UP = "ALERT_CLEAN_UP",
  ALERT_LIST_CLEAN_UP = "ALERT_LIST_CLEAN_UP",
  SET_ALERT = "SET_ALERT",
  REQUEST_STUDENT_ALERT_LIST = "REQUEST_STUDENT_ALERT_LIST",
  REQUEST_TUTOR_ALERT_LIST = "REQUEST_TUTOR_ALERT_LIST",
  REQUEST_ALERT = "REQUEST_ALERT",
  ALERT_STUDENT_LIST = "ALERT_STUDENT_LIST ",
  ALERT_TUTOR_LIST = "ALERT_TUTOR_LIST",
  REMOVE_ALERT = "REMOVE_ALERT",
}

export type AlertAction<Payload> = {
  type: AlertTypes;
  payload: Payload;
};

export type AlertRequest = {
  tutorUid: string;
  studentUid?: string;
  alertUid?: string;
  newStudentAlert?: boolean;
  newTutorAlert?: boolean;
  userType?: "tutor" | "student" | string;
};

export type AlertTypeValues = {
  tutorUid?: string;
  studentUid?: string;
  alertUid?: string;
  type: string;
  message: string;
  quantity: number;
  senderName: string;
  senderUid: string;
  open: boolean;
  userType: "tutor" | "student";
};

export type AlertState = {
  isLoading: boolean;
  error: string | undefined;
  studentAlerts: AlertTypeValues[] | undefined;
  studentAlert: AlertTypeValues | undefined;
  tutorAlerts: AlertTypeValues[] | undefined;
  tutorAlert: AlertTypeValues | undefined;
};
