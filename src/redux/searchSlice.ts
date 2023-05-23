import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  result: [],
};

export const searchSlice = createSlice({
  name: "asd",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.result = [...state.result, ...action.payload];
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
