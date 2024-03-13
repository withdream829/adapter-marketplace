import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type MainState = {
  baseModel: string;
  fineTurningMethod: string;
  resource: string;
  fineTurned: boolean;
  merged: boolean;
};

const initialState: MainState = {
  baseModel: "",
  fineTurningMethod: "",
  resource: "",
  fineTurned: false,
  merged: false,
};

export const mainSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<string>) => {
      state.baseModel = action.payload;
    },
    setMethod: (state, action: PayloadAction<string>) => {
      state.fineTurningMethod = action.payload;
    },
    setResource: (state, action: PayloadAction<string>) => {
      state.resource = action.payload;
    },
    setFineTurned: (state, action: PayloadAction<boolean>) => {
      state.fineTurned = action.payload;
    },
    setMerged: (state, action: PayloadAction<boolean>) => {
      state.merged = action.payload;
    },
  },
});

export const { setModel, setMethod, setResource, setFineTurned, setMerged } =
  mainSlice.actions;

export default mainSlice.reducer;
