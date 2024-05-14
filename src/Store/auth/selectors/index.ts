import { RootState } from "../../root-reducer";

import { AuthState } from "../types";

const getState = (state: RootState): AuthState => state.auth;

const getUserId = (state: RootState): string =>
  state.auth.currentUser?.uid || "";

const isLogged = (state: RootState): boolean => state.auth.isLogged;

const isLoading = (state: RootState): boolean => state.auth.isLoading;

export { getState, getUserId, isLoading, isLogged };
