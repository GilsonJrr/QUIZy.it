export enum AlertTypes {
  ALERT_CLEAN_UP = "ALERT_CLEAN_UP",
  ALERT_LIST_CLEAN_UP = "ALERT_LIST_CLEAN_UP",
  SET_ALERT = "SET_ALERT",
  REQUEST_ALERT_LIST = "REQUEST_ALERT_LIST",
  REQUEST_ALERT = "REQUEST_ALERT",
  ALERT_LIST = "ALERT_LIST",
  ALERT = "ALERT",
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
  alerts: AlertTypeValues[] | undefined;
  alert: AlertTypeValues | undefined;
};
