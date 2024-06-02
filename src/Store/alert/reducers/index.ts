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

interface requestAlertList {
  type: AlertTypes.REQUEST_ALERT_LIST;
  payload: AlertTypeValues[];
}

interface AlertList {
  type: AlertTypes.ALERT_LIST;
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
  | requestAlert
  | AlertList
  | requestAlertList
  | RemoveAlert;

const alertInitialState: AlertState = {
  isLoading: false,
  error: undefined,
  alert: undefined,
  alerts: undefined,
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
        alerts: undefined,
        alert: undefined,
      };
    }
    case AlertTypes.ALERT_LIST_CLEAN_UP: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        payload: undefined,
        alerts: undefined,
        alert: undefined,
      };
    }
    case AlertTypes.REQUEST_ALERT_LIST: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        alerts: undefined,
        alert: undefined,
      };
    }
    case AlertTypes.REQUEST_ALERT: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        alerts: undefined,
        alert: undefined,
      };
    }
    case AlertTypes.ALERT_LIST: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        alerts: Object.values(action.payload),
      };
    }
    case AlertTypes.SET_ALERT: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
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
