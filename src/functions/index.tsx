export const randomQuiz = (size: number, array: string[]) => {
  const index = Math.floor(Math.random() * size) + 0;

  return `/quiz?quizId=${array[index]}`;
};

export const addLeadingZero = (number: number) => {
  if (number >= 1 && number <= 9) {
    return "0" + number;
  } else {
    return number;
  }
};
