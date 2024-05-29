import { Reducer } from "redux";
import { UserState, UseData, UserTypes, TTutorInfo } from "../types";

interface RequestUserAgenda {
  type: UserTypes.REQUEST_USER;
}

interface RequestUserStudent {
  type: UserTypes.REQUEST_USER_STUDENT;
}

interface UserAgenda {
  type: UserTypes.USER;
  payload: UseData;
}

interface UserStudent {
  type: UserTypes.USER_STUDENT;
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

interface RequestTutorPhoto {
  type: UserTypes.REQUEST_TUTOR_INFO;
}

interface TutorPhoto {
  type: UserTypes.TUTOR_INFO;
  payload: TTutorInfo;
}

type AgendaAction =
  | RequestUserAgenda
  | UserAgenda
  | CleanUpAgenda
  | SetUserAgenda
  | SetUserFeedback
  | SetUserStudent
  | SetStudentToUser
  | RequestUserStudent
  | UserStudent
  | RequestTutorPhoto
  | TutorPhoto;

const agendaInitialState: UserState = {
  isLoading: false,
  user: undefined,
  userStudent: undefined,
  tutorInfo: undefined,
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
        userStudent: undefined,
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
    case UserTypes.REQUEST_USER_STUDENT: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        userStudent: undefined,
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
    case UserTypes.USER_STUDENT: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        userStudent: action.payload,
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
    case UserTypes.REQUEST_TUTOR_INFO: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
      };
    }
    case UserTypes.TUTOR_INFO: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        tutorInfo: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export { userReducer };
