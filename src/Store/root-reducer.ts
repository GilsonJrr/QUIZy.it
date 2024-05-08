import { combineReducers } from "redux";
import { PersistedState } from "redux-persist";
import { authReducer } from "./auth/reducers";
import { exampleReducer } from "./example/reducers";
import { studentReducer } from "./students/reducers";
import { groupReducer } from "./group/reducers";

export const rootReducer = combineReducers({
  authReducer: authReducer,
  exampleReducer: exampleReducer,
  studentReducer: studentReducer,
  groupReducer: groupReducer,
});

export type RootState = ReturnType<typeof rootReducer> & PersistedState;
