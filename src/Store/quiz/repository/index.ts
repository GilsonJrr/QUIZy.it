import { database } from "lib/firebase";
import {
  ref,
  set,
  get,
  remove,
  orderByChild,
  query,
  equalTo,
  limitToFirst,
} from "firebase/database";

import { QuizTypeValues } from "../types";

export const getQuizList = async (
  uid: string,
  category?: string,
  size?: number
) => {
  const queryRef = ref(database, `user/${uid}/quiz`);

  // Build the query based on category
  const quizQuery = category
    ? query(queryRef, orderByChild("category"), equalTo(category))
    : size
    ? query(queryRef, limitToFirst(size))
    : query(queryRef);

  return get(quizQuery)
    .then((snapshot) => {
      const quizzes: any[] = [];
      snapshot.forEach((childSnapshot) => {
        quizzes.push(childSnapshot.val());
      });
      return quizzes;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const getQuiz = async (uid: string, quizId: string) => {
  return get(ref(database, `user/${uid}/quiz/${quizId}`))
    .then((quiz) => quiz.val())
    .catch((err) => {
      throw new Error(err);
    });
};

export const setQuiz = async (_uid: string, data: QuizTypeValues) => {
  const { uid, ...rest } = data;

  // const restTeste = {
  //   id: rest.id,
  //   title: "Quiz de Geografia",
  //   description: "Teste seus conhecimentos sobre geografia.",
  //   category: "Geografia",
  //   type: "Multiple",
  //   questions: [
  //     {
  //       questionTitle: "Qual é o maior país do mundo em área territorial?",
  //       answer01: "Rússia",
  //       answer02: "Canadá",
  //       answer03: "China",
  //       answer04: "Estados Unidos",
  //       rightAnswer: "Rússia",
  //     },
  //     {
  //       questionTitle: "Qual é a capital da Austrália?",
  //       answer01: "Canberra",
  //       answer02: "Sydney",
  //       answer03: "Melbourne",
  //       answer04: "Brisbane",
  //       rightAnswer: "Canberra",
  //     },
  //     {
  //       questionTitle: "Qual é o rio mais longo do mundo?",
  //       answer01: "Rio Amazonas",
  //       answer02: "Rio Nilo",
  //       answer03: "Rio Yangtzé",
  //       answer04: "Rio Mississipi",
  //       rightAnswer: "Rio Amazonas",
  //     },
  //     {
  //       questionTitle: "Qual é o país com a maior população do mundo?",
  //       answer01: "China",
  //       answer02: "Índia",
  //       answer03: "Estados Unidos",
  //       answer04: "Indonésia",
  //       rightAnswer: "China",
  //     },
  //     {
  //       questionTitle: "Em que continente está localizado o deserto do Saara?",
  //       answer01: "África",
  //       answer02: "Ásia",
  //       answer03: "América do Sul",
  //       answer04: "Oceania",
  //       rightAnswer: "África",
  //     },
  //     {
  //       questionTitle: "Qual é o ponto mais alto do mundo?",
  //       answer01: "Monte Everest",
  //       answer02: "Monte Kilimanjaro",
  //       answer03: "Monte McKinley",
  //       answer04: "Monte Aconcágua",
  //       rightAnswer: "Monte Everest",
  //     },
  //     {
  //       questionTitle: "Qual é o país conhecido como 'Terra do Sol Nascente'?",
  //       answer01: "Japão",
  //       answer02: "Coreia do Sul",
  //       answer03: "China",
  //       answer04: "Vietnã",
  //       rightAnswer: "Japão",
  //     },
  //     {
  //       questionTitle: "Qual é o menor país do mundo em área territorial?",
  //       answer01: "Vaticano",
  //       answer02: "Mônaco",
  //       answer03: "Nauru",
  //       answer04: "Tuvalu",
  //       rightAnswer: "Vaticano",
  //     },
  //     {
  //       questionTitle: "Qual é o maior oceano do mundo?",
  //       answer01: "Oceano Pacífico",
  //       answer02: "Oceano Atlântico",
  //       answer03: "Oceano Índico",
  //       answer04: "Oceano Antártico",
  //       rightAnswer: "Oceano Pacífico",
  //     },
  //     {
  //       questionTitle:
  //         "Qual é o país com a maior extensão de fronteiras do mundo?",
  //       answer01: "Rússia",
  //       answer02: "China",
  //       answer03: "Canadá",
  //       answer04: "Brasil",
  //       rightAnswer: "Rússia",
  //     },
  //   ],
  // };

  console.log("new quiz: ", rest);
  return set(ref(database, `user/${_uid}/quiz/${data.id}`), rest)
    .then((quiz) => quiz)
    .catch((err) => {
      throw new Error(err);
    });
};

export const removeQuiz = async (uid: string, studentId: string) => {
  return remove(ref(database, `user/${uid}/quiz/${studentId}`))
    .then((quiz) => quiz)
    .catch((err) => {
      throw new Error(err);
    });
};
