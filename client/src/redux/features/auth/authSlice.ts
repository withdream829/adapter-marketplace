import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

type User = {
  id: string;
  username: string;
  email: string;
  subscribed: boolean;
};

const getStoredUser = (): User | null => {
  const userString = localStorage.getItem("user");
  if (!userString) return null;
  try {
    const user: User = JSON.parse(userString);
    return user;
  } catch (error) {
    console.error(
      "Parsing error on retrieving 'user' from localStorage:",
      error,
    );
    return null;
  }
};

const initialState: AuthState = {
  user: getStoredUser(),
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
