import { database } from "lib/firebase";
import { ref, set, get, remove, onValue } from "firebase/database";

import { AlertTypeValues } from "../types";

export const subscribeToStudentAlertList = (
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

export const subscribeToTutorAlertList = (
  uid: string,
  callback: (alert: any[]) => void
) => {
  const unsubscribe = onValue(
    ref(database, `user/${uid}/alert`),
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

export const getStudentAlertList = async (uid: string, studentId: string) => {
  return get(ref(database, `user/${uid}/students/${studentId}/alert`))
    .then((alerts) => alerts.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const getTutorAlertList = async (uid: string) => {
  return get(ref(database, `user/${uid}/alert`))
    .then((alerts) => alerts.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const getStudentAlert = async (
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

export const getTutorAlert = async (uid: string, alertId: string) => {
  get(ref(database, `user/${uid}/alert/${alertId}/`))
    .then((alerts) => alerts.val())
    .catch((err) => {
      throw new Error(err);
    });
  return;
};

export const setStudentAlert = async (data: AlertTypeValues) => {
  const { tutorUid, studentUid, ...rest } = data;
  return set(
    ref(
      database,
      `user/${tutorUid}/students/${studentUid}/alert/${rest.senderUid}`
    ),
    rest
  )
    .then((groups) => groups)
    .catch((err) => {
      throw new Error(err);
    });
};

export const setTutorAlert = async (data: AlertTypeValues) => {
  const { tutorUid, studentUid, ...rest } = data;
  return set(ref(database, `user/${tutorUid}/alert/${rest.senderUid}`), rest)
    .then((groups) => groups)
    .catch((err) => {
      throw new Error(err);
    });
};

export const removeStudentAlert = async (
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

export const removeTutorAlert = async (uid: string, alertId: string) => {
  return remove(ref(database, `user/${uid}/alert/${alertId}/`))
    .then((alerts) => alerts)
    .catch((err) => {
      throw new Error(err);
    });
};
