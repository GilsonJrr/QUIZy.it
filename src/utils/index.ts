import { Answer } from "../types";

export const randomize = (answer: Answer[]) => {
  let sequence = answer;

  for (let i = sequence.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = sequence[i];
    sequence[i] = sequence[j];
    sequence[j] = temp;
  }

  return sequence;
};

export const idGenerator = (size: number) => {
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var id = "";
  for (var i = 0; i < size; i++) {
    var idex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(idex);
  }
  return id;
};
