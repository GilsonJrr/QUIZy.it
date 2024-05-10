import { combineReducers } from "redux";
import { PersistedState } from "redux-persist";
import { authReducer } from "./auth/reducers";
import { exampleReducer } from "./example/reducers";
import { studentReducer } from "./students/reducers";
import { groupReducer } from "./group/reducers";
import { userReducer } from "./user/reducers";
import { categoryReducer } from "./category/reducers";
import { quizReducer } from "./quiz/reducers";

export const rootReducer = combineReducers({
  authReducer,
  exampleReducer,
  studentReducer,
  groupReducer,
  userReducer,
  categoryReducer,
  quizReducer,
});

export type RootState = ReturnType<typeof rootReducer> & PersistedState;
