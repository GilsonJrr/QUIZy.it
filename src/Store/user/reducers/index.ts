import { Reducer } from "redux";
import { UserState, UseData, UserTypes } from "../types";

interface RequestUserAgenda {
  type: UserTypes.REQUEST_USER;
}

interface UserAgenda {
  type: UserTypes.USER;
  payload: UseData;
}

interface CleanUpAgenda {
  type: UserTypes.CLEAN_UP_USER;
}

interface SetUserAgenda {
  type: UserTypes.SET_USER;
  payload: UseData;
}

interface SetStudentToUser {
  type: UserTypes.SET_STUDENT_TO_USER;
  payload: UseData;
}

interface SetUserStudent {
  type: UserTypes.SET_USER_STUDENT;
  payload: UseData;
}

interface SetUserFeedback {
  type: UserTypes.SET_USER_FEEDBACK;
}

type AgendaAction =
  | RequestUserAgenda
  | UserAgenda
  | CleanUpAgenda
  | SetUserAgenda
  | SetUserFeedback
  | SetUserStudent
  | SetStudentToUser;

const agendaInitialState: UserState = {
  isLoading: false,
  user: undefined,
};

const userReducer: Reducer<UserState, AgendaAction> = (
  state = agendaInitialState,
  action
) => {
  switch (action.type) {
    case UserTypes.CLEAN_UP_USER: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        user: undefined,
      };
    }
    case UserTypes.REQUEST_USER: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        user: undefined,
      };
    }
    case UserTypes.USER: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        user: action.payload,
      };
    }
    case UserTypes.SET_USER: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        user: action.payload,
      };
    }
    case UserTypes.SET_STUDENT_TO_USER: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        user: action.payload,
      };
    }
    case UserTypes.SET_USER_STUDENT: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        user: action.payload,
      };
    }
    case UserTypes.SET_USER_FEEDBACK: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export { userReducer };
