import { combineReducers, Reducer } from "redux";
import { PersistedState } from "redux-persist";

import { authReducer } from "./auth/reducers";
import { exampleReducer } from "./example/reducers";
import { studentReducer } from "./students/reducers";
import { groupReducer } from "./group/reducers";
import { userReducer } from "./user/reducers";
import { categoryReducer } from "./category/reducers";
import { quizReducer } from "./quiz/reducers";
import { resultReducer } from "./result/reducers";
import { myListReducer } from "./myList/reducers";

import { ExampleState } from "./example/types";
import { StudentState } from "./students/types";
import { GroupState } from "./group/types";
import { UserState } from "./user/types";
import { CategoryState } from "./category/types";
import { QuizState } from "./quiz/types";
import { ResultState } from "./result/types";
import { MyListState } from "./myList/types";
import { AuthState } from "./auth/types";

const rootReducer: Reducer<
  {
    auth: AuthState;
    example: ExampleState;
    student: StudentState;
    group: GroupState;
    user: UserState;
    category: CategoryState;
    quiz: QuizState;
    result: ResultState;
    myList: MyListState;
  },
  any
> = combineReducers({
  auth: authReducer.bind(null) as unknown as Reducer<AuthState>,
  example: exampleReducer.bind(null) as unknown as Reducer<ExampleState>,
  student: studentReducer.bind(null) as Reducer<StudentState>,
  group: groupReducer.bind(null) as Reducer<GroupState>,
  user: userReducer.bind(null) as Reducer<UserState>,
  category: categoryReducer.bind(null) as Reducer<CategoryState>,
  quiz: quizReducer.bind(null) as Reducer<QuizState>,
  result: resultReducer.bind(null) as Reducer<ResultState>,
  myList: myListReducer.bind(null) as Reducer<MyListState>,
});

export type RootState = ReturnType<typeof rootReducer> & PersistedState;

export { rootReducer };
