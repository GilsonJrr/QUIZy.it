import { Reducer } from "redux";
import { AuthState, AuthTypes } from "../types";
import { PersistPartial } from "redux-persist/es/persistReducer";

// Define action interfaces
interface SignInAction {
  type: AuthTypes.SIGNIN;
  payload: {
    currentUser: any;
    uid: string;
    firstLogIn: boolean;
  };
}

interface RequestSignOutAction {
  type: AuthTypes.REQUEST_SIGNOUT;
}

interface RequestSignOut {
  type: AuthTypes.SIGNOUT;
}

interface RequestAuthError {
  type: AuthTypes.AUTH_ERROR;
  payload: {
    error: string | undefined;
  };
}

interface RequestRequestSigninEmailPassword {
  type: AuthTypes.REQUEST_SIGNIN_EMAIL_PASSWORD;
}

interface resetPassword {
  type: AuthTypes.PASSWORD_RESET;
}

interface RequestRequestSignupEmailPassword {
  type: AuthTypes.REQUEST_SIGNUP_EMAIL_PASSWORD;
}

interface RequestPasswordReset {
  type: AuthTypes.REQUEST_PASSWORD_RESET;
}

interface RequestRequestSignupSucces {
  type: AuthTypes.SIGNUP_SUCCESS;
  payload: any;
}

type AuthAction =
  | SignInAction
  | RequestSignOutAction
  | RequestSignOut
  | RequestAuthError
  | RequestRequestSigninEmailPassword
  | RequestRequestSignupEmailPassword
  | RequestRequestSignupSucces
  | RequestPasswordReset
  | resetPassword;

const initialState: AuthState = {
  isLogged: false,
  isLogOuted: false,
  isLoading: false,
  email: "",
  currentUser: undefined,
  error: undefined,
  uid: "",
  dateUtc: "",
  firstLogIn: false,
};

const authReducer: Reducer<AuthState, AuthAction & PersistPartial> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthTypes.SIGNIN: {
      return {
        ...state,
        isLogged: true,
        isLoading: false,
        isLogOuted: false,
        error: undefined,
        currentUser: action.payload.currentUser,
        email: action.payload.currentUser.email,
        uid: action.payload.currentUser.uid,
      };
    }
    case AuthTypes.REQUEST_SIGNOUT: {
      return {
        ...state,
        isLogged: false,
        isLoading: true,
        currentUser: undefined,
        error: undefined,
      };
    }
    case AuthTypes.SIGNOUT: {
      return {
        ...state,
        isLogged: false,
        isLoading: false,
        isLogOuted: true,
        currentUser: undefined,
        error: undefined,
        email: "",
      };
    }
    case AuthTypes.AUTH_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }
    case AuthTypes.PASSWORD_RESET: {
      return {
        ...state,
        // isLoading: true,
        error: undefined,
      };
    }
    case AuthTypes.REQUEST_SIGNIN_EMAIL_PASSWORD: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    }
    case AuthTypes.REQUEST_SIGNUP_EMAIL_PASSWORD: {
      return {
        ...state,
        isLogged: false,
        isLoading: true,
        error: undefined,
      };
    }
    case AuthTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isLogged: false,
        isLoading: false,
        error: undefined,
        firstLogIn: true,
        email: action.payload.user.email,
        uid: action.payload.user.uid,
      };
    }
    case AuthTypes.REQUEST_PASSWORD_RESET: {
      return {
        ...state,
        isLogged: false,
        isLoading: false,
        error: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export { authReducer };
