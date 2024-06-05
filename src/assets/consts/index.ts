export const example = {
  category: "categoryName",
  description: "description here",
  id: "id here",
  image: "",
  questions: [
    {
      answer01: "a",
      answer02: "b",
      answer03: "c",
      answer04: "d",
      questionTitle: "questionTitle",
      rightAnswer: "same as answer01", //!!important
    },
  ],
  title: "quizTitle",
  type: "Multiple",
};
//rightAnswer deve ser igual a answer01 sempre

export const ToFExample = {
  id: "id here",
  category: "categoryName",
  title: "quizTitle",
  type: "TrueOrFalse",
  description: "",
  image: "",
  date: "added date in this format: 1716835a740060",
  questions: [
    {
      questionTitle: "questionTitle",
      rightAnswer: "boolean",
    },
  ],
};

export const FillTheBlankExample = {
  id: "id here",
  category: "categoryName",
  title: "quizTitle",
  type: "FillTheBlanks",
  description: "",
  image: "",
  date: "added date in this format: 1716835a740060",
  questions: [
    {
      questionTitle: "This watch is expensive.",
      rightAnswer: ["watch"],
      spitedPhrase: ["This", "is", "expensive."],
    },
  ],
};
