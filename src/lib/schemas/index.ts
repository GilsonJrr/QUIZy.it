import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  login: Yup.string().required("You must enter your email"),
  password: Yup.string().required("You must enter your password"),
});

export const RequestResetSchema = Yup.object().shape({
  login: Yup.string().required("You must enter your email"),
});

export const ResetPasswordSchema = Yup.object().shape({
  confirmPassword: Yup.string().required(
    "You must enter your password confirmation"
  ),
  password: Yup.string().required("You must enter your password"),
});

export const SignUpSchema = Yup.object().shape({
  login: Yup.string().required("You must enter your email"),
  password: Yup.string().required("You must enter your password"),
  name: Yup.string().required("You must enter your name"),
});

export const GroupCreateSchema = Yup.object().shape({
  title: Yup.string().required("You must add a title").min(2),
  about: Yup.string(),
});

export const CategoryCreateSchema = Yup.object().shape({
  title: Yup.string().required("You must add a title").min(2),
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

export const multipleChosesSchema = Yup.object().shape({
  questions: Yup.array(
    Yup.object().shape({
      questionTitle: Yup.string().required("Question title is required"),
      answer01: Yup.string().required("Answer 1 is required"),
      answer02: Yup.string().required("Answer 2 is required"),
      answer03: Yup.string().optional(), // Optional answer 3
      answer04: Yup.string().optional(), // Optional answer 4
      rightAnswer: Yup.string().optional(),
    })
  )
    .min(1, "You need at least one question")
    .required("Questions are required"),
});

export const FillTheBlanksSchema = Yup.object().shape({
  questions: Yup.array(
    Yup.object().shape({
      questionTitle: Yup.string().required("Question title is required"),
    })
  )
    .min(1, "You need at least one question")
    .required("Questions are required"),
});

export const trueOrFalseSchema = Yup.object().shape({
  questions: Yup.array(
    Yup.object().shape({
      questionTitle: Yup.string().required("Question title is required"),
      rightAnswer: Yup.boolean(),
    })
  )
    .min(1, "You need at least one question")
    .required("Questions are required"),
});

export const NewQuizSchema = Yup.object().shape({
  title: Yup.string().required("You must add a title").min(3),
  description: Yup.string(),
  image: Yup.string(),
  type: Yup.string().required("O tipo é obrigatório"),
  category: Yup.string()
    .required("Select one category")
    .notOneOf(["categoryLess"], "Select one category"),
});
