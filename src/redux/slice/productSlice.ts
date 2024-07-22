import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callFetchProduct } from "../../config/api";
import { IProduct } from "../../types/backend";

interface IState {
  isFetching: boolean;
  productName: string;
  page: number;
  offset: number;
  total: number;
  result: IProduct[];
}
// First, create the thunk
export const fetchProduct: any = createAsyncThunk(
  "product/fetchProduct",
  async (query: string) => {
    const response = await callFetchProduct(query);
    return response;
  }
);

const initialState: IState = {
  isFetching: true,
  productName: "",
  page: 1,
  offset: 10,
  total: 50,
  result: [],
};

export const categorySlide = createSlice({
  name: "category",
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
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.isFetching = true;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isFetching = false;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
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

export const { setActiveMenu } = categorySlide.actions;

export default categorySlide.reducer;
