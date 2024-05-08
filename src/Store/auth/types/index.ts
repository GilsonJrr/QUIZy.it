export enum AuthTypes {
  SIGNIN = "@auth/SIGNIN",
  REQUEST_SIGNIN_EMAIL_PASSWORD = "@auth/REQUEST_SIGNIN_EMAIL_PASSWORD",
  SIGNOUT = "@auth/SIGNOUT",
  REQUEST_SIGNOUT = "@auth/REQUEST_SIGNOUT",
  REQUEST_SIGNUP_EMAIL_PASSWORD = "@auth/REQUEST_SIGNUP_EMAIL_PASSWORD",
  SIGNUP_SUCCESS = "@auth/SIGNUP_SUCCESS",
  AUTH_ERROR = "@auth/AUTH_ERROR",
  REQUEST_PASSWORD_RESET = "REQUEST_PASSWORD_RESET",
}

export type AuthState = {
  isLogged: boolean;
  isLoading: boolean;
  isLogOuted: boolean;
  email: string;
  currentUser: any | undefined;
  error?: string;
  uid?: string;
  dateUtc?: string;
  firstLogIn: boolean;
};

export type AuthAction<Payload> = {
  type: AuthTypes;
  payload: Payload;
};

export type AuthReducer = (
  state: AuthState,
  actions: AuthAction<AuthState>
) => AuthState;

export interface AuthSignInInput {
  email: string;
  password: string;
}

export interface AuthPasswordResetInput {
  email: string;
}

export interface AuthSignUpInput {
  email: string;
  password: string;
  userType?: "tutor" | "student";
}

//Agenda

export type UserRequest = {
  uid: string;
};

export type UseData = {
  email: string;
  name: string;
  age: string;
  gender: string;
  phone: string;
  uid: string;
  observation: string;
  firstLogIn: boolean;
};

export enum ErrorsArray {
  "auth/invalid-email" = "E-mail inválido.",
  "auth/user-disabled" = "Usuário desativado.",
  "auth/user-not-found" = "Usuário não encontrado.",
  "auth/wrong-password" = "Senha incorreta.",
  "auth/network-request-failed" = "Erro de rede ao tentar fazer login.",
  "auth/user-cancelled" = "Operação cancelada pelo usuário.",
  "auth/unknown" = "Erro desconhecido durante o login.",
  "auth/argument-error" = "Argumento inválido fornecido.",
  "auth/timeout" = "Tempo limite excedido na operação.",
  "auth/too-many-requests" = "Muitas tentativas. Tente novamente mais tarde.",
  "auth/invalid-credential" = "Email ou senha invalidos",
  "auth/weak-password" = "Senha muito fraca.",
  "auth/email-already-in-use" = "E-mail já em uso.",
}
