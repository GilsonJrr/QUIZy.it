import { Reducer } from "redux";
import { AlertTypeValues, AlertTypes, AlertState } from "../types";

interface CleanUpAlert {
  type: AlertTypes.ALERT_CLEAN_UP;
}
interface CleanUpAlertList {
  type: AlertTypes.ALERT_LIST_CLEAN_UP;
}

interface SetAlert {
  type: AlertTypes.SET_ALERT;
  payload: AlertTypeValues[];
}

interface RemoveAlert {
  type: AlertTypes.REMOVE_ALERT;
}

interface requestStudentAlertList {
  type: AlertTypes.REQUEST_STUDENT_ALERT_LIST;
  payload: AlertTypeValues[];
}

interface requestTutorAlertList {
  type: AlertTypes.REQUEST_TUTOR_ALERT_LIST;
  payload: AlertTypeValues[];
}

interface AlertStudentList {
  type: AlertTypes.ALERT_STUDENT_LIST;
  payload: AlertTypeValues[];
}

interface AlertTutorList {
  type: AlertTypes.ALERT_TUTOR_LIST;
  payload: AlertTypeValues[];
}

interface requestAlert {
  type: AlertTypes.REQUEST_ALERT;
  payload: AlertTypeValues;
}

type AlertAction =
  | CleanUpAlert
  | CleanUpAlertList
  | SetAlert
  | requestStudentAlertList
  | requestTutorAlertList
  | requestAlert
  | AlertStudentList
  | AlertTutorList
  | RemoveAlert;

const alertInitialState: AlertState = {
  isLoading: false,
  error: undefined,
  studentAlerts: undefined,
  studentAlert: undefined,
  tutorAlerts: undefined,
  tutorAlert: undefined,
};

const alertReducer: Reducer<AlertState, AlertAction> = (
  state = alertInitialState,
  action
) => {
  switch (action.type) {
    case AlertTypes.ALERT_CLEAN_UP: {
      return {
        ...state,
        error: undefined,
        payload: undefined,
        tutorAlert: undefined,
        studentAlert: undefined,
      };
    }
    case AlertTypes.ALERT_LIST_CLEAN_UP: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        payload: undefined,
        tutorAlerts: undefined,
        studentAlerts: undefined,
      };
    }
    case AlertTypes.REQUEST_TUTOR_ALERT_LIST: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        tutorAlerts: undefined,
      };
    }
    case AlertTypes.REQUEST_STUDENT_ALERT_LIST: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        studentAlerts: undefined,
      };
    }
    case AlertTypes.REQUEST_ALERT: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        tutorAlert: undefined,
      };
    }
    case AlertTypes.ALERT_STUDENT_LIST: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        studentAlerts: Object.values(action.payload),
      };
    }
    case AlertTypes.ALERT_TUTOR_LIST: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        tutorAlerts: Object.values(action.payload),
      };
    }
    case AlertTypes.SET_ALERT: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        alerts: action.payload,
      };
    }
    case AlertTypes.REMOVE_ALERT: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export { alertReducer };
