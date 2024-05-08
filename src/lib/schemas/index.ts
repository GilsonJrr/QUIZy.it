import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  login: Yup.string().required("You must enter your email"),
  password: Yup.string().required("You must enter your password"),
});

export const GroupCreateSchema = Yup.object().shape({
  title: Yup.string().required("You must add a title").min(3),
  about: Yup.string(),
});

export const StudentCreateSchema = Yup.object().shape({
  name: Yup.string().required("You must add a title").min(3),
  phone: Yup.string(),
  email: Yup.string().required("You must add a image"),
  group: Yup.string(),
  about: Yup.string(),
  birthDate: Yup.string(),
  socialNetWork: Yup.string(),
});

export const MultipleChosesSchema = Yup.object().shape({
  questionTitle: Yup.string().required("You must add a title"),
  answer01: Yup.string().required("You must add a right answer"),
  answer02: Yup.string().required("You must add at least one more answer"),
  answer03: Yup.string(),
  answer04: Yup.string(),
  rightAnswer: Yup.string(),
});

export const trueOrFalseSchema = Yup.object().shape({
  questionTitle: Yup.string().required("You must add a title"),
  answer: Yup.boolean().required("You must add a right answer"),
});

export const NewQuizSchema = Yup.object().shape({
  title: Yup.string().required("You must add a title").min(3),
  description: Yup.string(),
  image: Yup.string().required("You must add a image"),
  type: Yup.string().required("O tipo é obrigatório"),
  category: Yup.string().required("A categoria é obrigatória"),
  questions: Yup.array().of(MultipleChosesSchema),
  trueOrFalseQuestions: Yup.array().of(trueOrFalseSchema),
});
