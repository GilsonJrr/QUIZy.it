import { RootState } from "../../root-reducer";

import { AuthState } from "../types";

const getState = (state: RootState): AuthState => state.authReducer;

const getUserId = (state: RootState): string =>
  state.authReducer.currentUser?.uid || "";

const isLogged = (state: RootState): boolean => state.authReducer.isLogged;

const isLoading = (state: RootState): boolean => state.authReducer.isLoading;

export { getState, getUserId, isLoading, isLogged };
