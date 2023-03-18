import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createReducer(initialState, {
  loginRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  loginSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  loginFailure: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  loadUserRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  loadUserSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  loadUserFailure: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  registerRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  registerSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  registerFailure: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },
});
