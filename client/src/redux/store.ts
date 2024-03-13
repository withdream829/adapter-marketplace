import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import mainReducer from "./features/main/mainSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    main: mainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
