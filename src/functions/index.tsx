export const randomQuiz = (size: number, array: string[]) => {
  const index = Math.floor(Math.random() * size) + 0;

  return `/quiz?quizId=${array[index]}`;
};
