import { takeLatest, put, call } from "redux-saga/effects";

import {
  authError,
  requestPasswordReset,
  signIn,
  signOut,
  signUpSuccess,
} from "../actions";

import {
  passwordResetFirebase,
  resetPassword,
  signInWithEmailPasswordFirebase,
  signOutFirebase,
  signUpWithEmailPasswordFirebase,
} from "../repository";

import {
  AuthAction,
  AuthPasswordResetInput,
  AuthSignInInput,
  AuthSignUpInput,
  AuthTypes,
} from "../types";

import { UseData } from "Store/user/types";
import {
  cleanUpUser,
  requestStudentUser,
  requestUser,
  setStudentToUser,
  setStudentUser,
  setUser,
} from "Store/user/actions";
import { studentCleanUp, studentListCleanUp } from "Store/students/actions";
import { resultCleanUp, resultListCleanUp } from "Store/result/actions";
import { myListCleanUp, myListListCleanUp } from "Store/myList/actions";
import { quizCleanUp, quizListCleanUp } from "Store/quiz/actions";
import { categoryCleanUp, categoryListCleanUp } from "Store/category/actions";
import { groupCleanUp, groupListCleanUp } from "Store/group/actions";

export function* requestSignInEmailPasswordSaga(
  props: AuthAction<AuthSignInInput>
): any {
  const email = props.payload.email;
  const password = props.payload.password;
  const onSuccess = props.payload.onSuccess;

  try {
    if (email && password) {
      const userCredentials = yield call(
        signInWithEmailPasswordFirebase,
        email,
        password
      );
      yield put(signIn(userCredentials.uid));
      yield put(requestUser({ uid: userCredentials.uid }));
      yield put(requestStudentUser({ uid: userCredentials.uid }));
      // if (userCredentials.use.emailVerified) {
      // } else {
      //   // "redirect to "/verifyemail""
      //   yield call(() => (window.location.href = "/signin"));
      // }
      yield put(() => onSuccess?.());
    }
  } catch (err: any) {
    alert(`Email or Password not found or wrong`);
    yield put(authError("cannot sign In"));
  }
}

export function* requestSignOutSaga(): any {
  try {
    //TODO: see a better way to do it:
    yield call(signOutFirebase);

    yield put(cleanUpUser());
    yield put(studentCleanUp());
    yield put(studentListCleanUp());
    yield put(resultCleanUp());
    yield put(resultListCleanUp());
    yield put(myListCleanUp());
    yield put(myListListCleanUp());
    yield put(quizCleanUp());
    yield put(quizListCleanUp());
    yield put(categoryCleanUp());
    yield put(categoryListCleanUp());
    yield put(groupCleanUp());
    yield put(groupListCleanUp());

    yield put(signOut());
  } catch {
    // yield put(signOut());
  }
}

export function* requestSignUpEmailPasswordSaga(
  props: AuthAction<AuthSignUpInput>
): any {
  const { email, password, userType, name, tutorUID, ...rest } = props.payload;
  const onSuccess = props.payload.onSuccess;

  try {
    if (email && password) {
      const userCredentials = yield call(
        signUpWithEmailPasswordFirebase,
        email,
        password
      );
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
        yield put(requestPasswordReset({ email: newUser.email }));
        yield put(setStudentToUser(newUser));
        yield put(setStudentUser(newUser));
      }

      yield put(() => onSuccess?.());
    }
  } catch (err: any) {
    yield put(authError("cannot sign Up"));
  }
}

export function* resetPasswordSaga(props: AuthAction<AuthSignInInput>): any {
  const password = props.payload.password;
  const oobCode = props.payload.oobCode;
  const onSuccess = props.payload.onSuccess;

  try {
    if (password && oobCode) {
      yield call(resetPassword, oobCode, password);
    }
    yield put(() => onSuccess?.());
  } catch (err: any) {
    yield put(authError("cannot sign In"));
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
  takeLatest(AuthTypes.PASSWORD_RESET, resetPasswordSaga),
];
