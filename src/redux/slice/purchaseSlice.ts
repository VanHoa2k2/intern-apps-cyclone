import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPurchase } from "../../types/backend";
import { callFetchPurchase } from "../../config/api";

interface IState {
  isFetching: boolean;
  page: number;
  offset: number;
  total: number;
  result: IPurchase[];
}
// First, create the thunk
export const fetchPurchase: any = createAsyncThunk(
  "purchase/fetchPurchase",
  async (query: string) => {
    const response = await callFetchPurchase(query);
    return response;
  }
);

const initialState: IState = {
  isFetching: true,
  page: 1,
  offset: 10,
  total: 50,
  result: [],
};

export const purchaseSlide = createSlice({
  name: "purchase",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setActiveMenu: (state, action) => {
      // state.activeMenu = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPurchase.pending, (state, action) => {
      state.isFetching = true;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchPurchase.rejected, (state, action) => {
      state.isFetching = false;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchPurchase.fulfilled, (state, action) => {
      if (action.payload) {
        state.isFetching = false;
        state.result = action.payload;
        // state.total = action.payload.length;
      }
      // Add user to the state array

      // state.courseOrder = action.payload;
    });
  },
});

export const { setActiveMenu } = purchaseSlide.actions;

export default purchaseSlide.reducer;
