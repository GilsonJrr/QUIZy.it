export const randomQuiz = () => {
  const id = Math.floor(Math.random() * (32 - 9 + 1)) + 9;
  const difficultyNumber = Math.floor(Math.random() * 3) + 1;
  const difficult =
    difficultyNumber === 1
      ? "easy"
      : difficultyNumber === 2
      ? "medium"
      : difficultyNumber === 3 && "hard";

  return `/quiz?amount=10&category=${id}&difficulty=${difficult}&type=multiple`;
};
