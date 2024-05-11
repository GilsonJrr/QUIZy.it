import { takeLatest, put, call, select } from "redux-saga/effects";

import { authError, signIn, signOut, signUpSuccess } from "../actions";

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
} from "../types";

import * as authSelectors from "../selectors";
import { UseData } from "Store/user/types";
import {
  requestStudentUser,
  requestUser,
  setStudentToUser,
  setStudentUser,
  setUser,
} from "Store/user/actions";

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
      localStorage.setItem("userId", userCredentials.uid);
      yield put(signIn(userCredentials.uid));

      yield put(requestUser({ uid: userCredentials.uid }));
      yield put(requestStudentUser({ uid: userCredentials.uid }));
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
  const { email, password, userType, name, tutorUID, ...rest } = props.payload;

  try {
    if (email && password) {
      const userCredentials = yield call(
        signUpWithEmailPasswordFirebase,
        email,
        password
      );
      console.log("userCredentials", userCredentials);
      yield put(signUpSuccess(userCredentials));
      const newUser: UseData = {
        name: name || "",
        phone: "",
        email: email,
        uid: userCredentials.user.uid,
        userType: userType || "",
        tutorID: tutorUID || "",
        ...rest,
      };
      if (userType === "tutor") {
        yield put(setUser(newUser));
      } else {
        yield put(setStudentToUser(newUser));
        yield put(setStudentUser(newUser));
      }
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
