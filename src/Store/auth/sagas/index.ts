import { takeLatest, put, call, select } from "redux-saga/effects";

import {
  authError,
  signIn,
  signOut,
  signUpSuccess,
  // userAgenda,
} from "../actions";

import {
  passwordResetFirebase,
  signInWithEmailPasswordFirebase,
  signOutFirebase,
  signUpWithEmailPasswordFirebase,
  // getAgenda,
} from "../repository";

import {
  AuthAction,
  AuthPasswordResetInput,
  AuthSignInInput,
  AuthSignUpInput,
  AuthTypes,
  ErrorsArray,
  // UserRequest,
} from "../types";

import * as authSelectors from "../selectors";
// import { setUser } from "../../user/actions";
// import { UseData } from "../../user/types";

export function* requestSignInEmailPasswordSaga(
  props: AuthAction<AuthSignInInput>
): any {
  const email = props.payload.email;
  const password = props.payload.password;

  // console.log("datas", email, password);
  try {
    if (email && password) {
      const userCredentials = yield call(
        signInWithEmailPasswordFirebase,
        email,
        password
      );
      // console.log("datas", userCredentials);
      localStorage.setItem("userId", userCredentials.uid);
      yield put(signIn(userCredentials.uid));
    }
  } catch (err: any) {
    yield put(authError("cannot sign In"));
  }
}

export function* requestSignOutSaga(): any {
  try {
    const isLogged = yield select(authSelectors.isLogged);

    yield call(signOutFirebase);
    if (isLogged) {
      //Update it maybe not necessary
    }
    yield put(signOut());
  } catch {
    yield put(signOut());
  }
}

export function* requestSignUpEmailPasswordSaga(
  props: AuthAction<AuthSignUpInput>
): any {
  const email = props.payload.email;
  const password = props.payload.password;
  const userType = props.payload.userType;

  try {
    if (email && password) {
      const userCredentials = yield call(
        signUpWithEmailPasswordFirebase,
        email,
        password
      );
      console.log("userCredentials", userCredentials);
      yield put(signUpSuccess(userCredentials));
      //   const newUser: UseData = {
      //     name: "",
      //     age: "",
      //     phone: "",
      //     gender: "",
      //     observation: "",
      //     firstLogIn: true,
      //     email: email,
      //     uid: userCredentials.user.uid,
      //     userType: "admin",
      //     adminUid: "",
      //   };
      //   yield put(setUser(newUser));
    }
  } catch (err: any) {
    yield put(authError("cannot sign Up"));
  }
}

export function* requestPasswordResetSaga(
  props: AuthAction<AuthPasswordResetInput>
): any {
  const email = props.payload.email;

  try {
    if (email) {
      yield call(passwordResetFirebase, email);
    }
  } catch (err: any) {
    yield put(authError("cannot sign In"));
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(
    AuthTypes.REQUEST_SIGNIN_EMAIL_PASSWORD,
    requestSignInEmailPasswordSaga
  ),
  takeLatest(AuthTypes.REQUEST_SIGNOUT, requestSignOutSaga),
  takeLatest(
    AuthTypes.REQUEST_SIGNUP_EMAIL_PASSWORD,
    requestSignUpEmailPasswordSaga
  ),
  takeLatest(AuthTypes.REQUEST_PASSWORD_RESET, requestPasswordResetSaga),
];
