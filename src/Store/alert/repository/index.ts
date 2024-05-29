import { database } from "lib/firebase";
import { ref, set, get, remove, onValue } from "firebase/database";

import { AlertTypeValues } from "../types";

export const subscribeToAlertList = (
  uid: string,
  studentId: string,
  callback: (alert: any[]) => void
) => {
  const unsubscribe = onValue(
    ref(database, `user/${uid}/students/${studentId}/alert`),
    (snapshot) => {
      const alert: any[] = [];
      snapshot.forEach((childSnapshot) => {
        alert.push(childSnapshot.val());
      });
      callback(alert);
    }
  );

  return unsubscribe;
};

export const getAlertList = async (uid: string, studentId: string) => {
  return get(ref(database, `user/${uid}/students/${studentId}/alert`))
    .then((alerts) => alerts.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const getAlert = async (
  uid: string,
  studentId: string,
  alertId: string
) => {
  get(ref(database, `user/${uid}/students/${studentId}/alert/${alertId}/`))
    .then((alerts) => alerts.val())
    .catch((err) => {
      throw new Error(err);
    });
  return;
};

export const setAlert = async (_uid: string, data: AlertTypeValues) => {
  const { tutorUid, studentUid, alertUid, ...rest } = data;
  return set(
    ref(database, `user/${tutorUid}/students/${studentUid}/alert/${rest.type}`),
    rest
  )
    .then((groups) => groups)
    .catch((err) => {
      throw new Error(err);
    });
};

export const removeAlert = async (
  uid: string,
  studentId: string,
  alertId: string
) => {
  return remove(
    ref(database, `user/${uid}/students/${studentId}/alert/${alertId}/`)
  )
    .then((alerts) => alerts)
    .catch((err) => {
      throw new Error(err);
    });
};
