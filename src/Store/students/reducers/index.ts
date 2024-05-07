import { Reducer } from "redux";
import { StudentTypeValues, StudentTypes, StudentState } from "../types";

interface CleanUpStudent {
  type: StudentTypes.STUDENT_CLEAN_UP;
}

interface SetStudent {
  type: StudentTypes.SET_STUDENT;
  payload: StudentTypeValues[];
}

interface requestStudentList {
  type: StudentTypes.REQUEST_STUDENT_LIST;
  payload: StudentTypeValues[];
}

interface StudentList {
  type: StudentTypes.STUDENT_LIST;
  payload: StudentTypeValues[];
}

interface requestStudent {
  type: StudentTypes.REQUEST_STUDENT;
  payload: StudentTypeValues;
}

interface Student {
  type: StudentTypes.STUDENT;
  payload: StudentTypeValues;
}

type StudentAction =
  | CleanUpStudent
  | SetStudent
  | requestStudentList
  | requestStudent
  | StudentList
  | Student;

const studentInitialState: StudentState = {
  isLoading: false,
  students: undefined,
  student: undefined,
  error: undefined,
};

const studentReducer: Reducer<StudentState, StudentAction> = (
  state = studentInitialState,
  action
) => {
  switch (action.type) {
    case StudentTypes.STUDENT_CLEAN_UP: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        payload: undefined,
      };
    }
    case StudentTypes.REQUEST_STUDENT_LIST: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        students: undefined,
      };
    }
    case StudentTypes.REQUEST_STUDENT: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
        student: undefined,
      };
    }
    case StudentTypes.STUDENT: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        student: action.payload,
      };
    }
    case StudentTypes.STUDENT_LIST: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        students: Object.values(action.payload),
      };
    }
    case StudentTypes.SET_STUDENT: {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        students: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export { studentReducer };
