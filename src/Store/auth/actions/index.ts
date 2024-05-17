import {
  AuthTypes,
  AuthAction,
  AuthSignInInput,
  AuthSignUpInput,
  AuthPasswordResetInput,
} from "../types";

export function signIn(
  //   currentUser: FirebaseAuthTypes.User
  // ): AuthAction<{ currentUser: FirebaseAuthTypes.User }> {
  currentUser: any
): AuthAction<{ currentUser: any }> {
  return {
    type: AuthTypes.SIGNIN,
    payload: { currentUser },
  };
}

export function signUpSuccess(
  props: any,
  onSuccess?: () => void
): AuthAction<any> {
  return {
    type: AuthTypes.SIGNUP_SUCCESS,
    payload: { ...props },
    onSuccess,
  };
}

export function requestSignInEmailPassword(
  props: AuthSignInInput
): AuthAction<AuthSignInInput> {
  return {
    type: AuthTypes.REQUEST_SIGNIN_EMAIL_PASSWORD,
    payload: { ...props },
  };
}

export function resetPassword(
  props: AuthSignInInput,
  onSuccess?: () => void
): AuthAction<AuthSignInInput> {
  return {
    type: AuthTypes.PASSWORD_RESET,
    payload: { ...props },
    onSuccess,
  };
}

export function requestPasswordReset(
  props: AuthPasswordResetInput
): AuthAction<AuthPasswordResetInput> {
  return {
    type: AuthTypes.REQUEST_PASSWORD_RESET,
    payload: { ...props },
  };
}

export function signOut() {
  return {
    type: AuthTypes.SIGNOUT,
  };
}

export function requestSignOut() {
  return {
    type: AuthTypes.REQUEST_SIGNOUT,
  };
}

export function requestSignUpEmailPassword(
  props: AuthSignUpInput,
  onSuccess?: () => void
): AuthAction<AuthSignUpInput> {
  return {
    type: AuthTypes.REQUEST_SIGNUP_EMAIL_PASSWORD,
    payload: { ...props },
    onSuccess,
  };
}

export function authError(error: any) {
  return {
    type: AuthTypes.AUTH_ERROR,
    payload: { error },
  };
}
