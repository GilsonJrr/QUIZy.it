import { database } from "lib/firebase";
import { ref, set, get, remove, onValue } from "firebase/database";

import { AlertTypeValues } from "../types";

export const subscribeToAlertList = (
  uid: string,
  receiverUid: string,
  callback: (alert: any[]) => void
) => {
  const unsubscribe = onValue(
    ref(database, `alert/${uid}/${receiverUid}`),
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

export const getAlertList = async (data: AlertTypeValues) => {
  const { tutorUid, receiverUid } = data;
  return get(ref(database, `alert/${tutorUid}/${receiverUid}`))
    .then((alerts) => alerts.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const getAlert = async (data: AlertTypeValues) => {
  const { tutorUid, senderUid, receiverUid } = data;
  get(ref(database, `alert/${tutorUid}/${receiverUid}/${senderUid}`))
    .then((alerts) => alerts.val())
    .catch((err) => {
      throw new Error(err);
    });
  return;
};

export const setAlert = async (data: AlertTypeValues) => {
  const { tutorUid, studentUid, ...rest } = data;
  return set(
    ref(database, `alert/${tutorUid}/${rest.receiverUid}/${rest.senderUid}`),
    rest
  )
    .then((groups) => groups)
    .catch((err) => {
      throw new Error(err);
    });
};

export const removeAlert = async (data: AlertTypeValues) => {
  const { tutorUid, studentUid, ...rest } = data;
  return remove(
    ref(database, `alert/${tutorUid}/${rest.receiverUid}/${rest.senderUid}`)
  )
    .then((alerts) => alerts)
    .catch((err) => {
      throw new Error(err);
    });
};
