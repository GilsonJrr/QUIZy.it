import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./root-reducer";
import { rootSagas } from "./root-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["SET_STUDENT_PHOTO"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.photo"],
        // Ignore these paths in the state
        ignoredPaths: ["student.photo"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSagas);

const persistor = persistStore(store);

export { store, persistor };
