import {
  AlertTypes,
  AlertRequest,
  AlertAction,
  AlertTypeValues,
} from "../types";

export function alertCleanUp() {
  return {
    type: AlertTypes.ALERT_CLEAN_UP,
  };
}

export function alertListCleanUp() {
  return {
    type: AlertTypes.ALERT_LIST_CLEAN_UP,
  };
}

export function requestAlertList(
  props: AlertRequest
): AlertAction<AlertRequest> {
  return {
    type: AlertTypes.REQUEST_ALERT_LIST,
    payload: { ...props },
  };
}

export function requestAlert(props: AlertRequest): AlertAction<AlertRequest> {
  return {
    type: AlertTypes.REQUEST_ALERT,
    payload: { ...props },
  };
}

export function alertList(
  props: AlertTypeValues
): AlertAction<AlertTypeValues> {
  return {
    type: AlertTypes.ALERT_LIST,
    payload: { ...props },
  };
}

export function setAlert(props: AlertRequest): AlertAction<AlertRequest> {
  return {
    type: AlertTypes.SET_ALERT,
    payload: { ...props },
  };
}

export function removeAlert(props: AlertRequest): AlertAction<AlertRequest> {
  return {
    type: AlertTypes.REMOVE_ALERT,
    payload: { ...props },
  };
}
