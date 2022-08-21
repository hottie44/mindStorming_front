import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import loginReducer from "../features/login/loginSlice";
import flowReducer from "../features/flow/flowSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    flow: flowReducer
  },
});
