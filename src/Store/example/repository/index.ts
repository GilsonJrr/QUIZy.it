// import database from "@react-native-firebase/database";
// import { ref, set, get } from "firebase/database";

import { ExampleTypeValues } from "../types";

export const getExample = async (uid: string) => {
  // return database()
  //   .ref(`example/${uid}`)
  //   .once("value")
  //   .then((example) => example.val())
  //   .catch((err) => {
  //     throw new Error(err);
  //   });
};

export const setExample = async (uid: string, data: ExampleTypeValues) => {
  // return database()
  //   .ref(`example/${uid}/${data.id}`)
  //   .set(data)
  //   .then((example) => example)
  //   .catch((err) => {
  //     throw new Error(err);
  //   });
};
