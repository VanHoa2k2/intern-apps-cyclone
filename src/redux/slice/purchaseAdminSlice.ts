import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPurchase } from "../../types/backend";
import { callFetchPurchaseAdmin } from "../../config/api";

interface IState {
  isFetching: boolean;
  page: number;
  offset: number;
  total: number;
  result: IPurchase[];
}
// First, create the thunk
export const fetchPurchaseAdmin: any = createAsyncThunk(
  "purchaseAdmin/fetchPurchaseAdmin",
  async (query: string) => {
    const response = await callFetchPurchaseAdmin(query);
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

export const purchaseAdminSlide = createSlice({
  name: "purchaseAdmin",
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
    builder.addCase(fetchPurchaseAdmin.pending, (state, action) => {
      state.isFetching = true;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchPurchaseAdmin.rejected, (state, action) => {
      state.isFetching = false;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchPurchaseAdmin.fulfilled, (state, action) => {
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

export const { setActiveMenu } = purchaseAdminSlide.actions;

export default purchaseAdminSlide.reducer;
