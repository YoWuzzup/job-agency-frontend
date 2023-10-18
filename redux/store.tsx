import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import thunk from "redux-thunk";

import reducer from "./reducers/index";

// initial states here
const preloadedState = {};

// middleware
const middleware = [thunk];

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
