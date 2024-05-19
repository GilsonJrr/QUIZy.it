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

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export const sumByCategory = (data: any[]) => {
  return data?.reduce((acc, cur) => {
    const categoryIndex = acc.findIndex(
      (item: { category: any }) => item.category === cur.category
    );
    if (categoryIndex !== -1) {
      acc[categoryIndex].size += cur.size;
    } else {
      acc.push({ category: cur.category, size: cur.size });
    }
    return acc;
  }, []);
};
