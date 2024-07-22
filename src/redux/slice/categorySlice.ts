import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callFetchCategory } from "../../config/api";
import { ICategory } from "../../types/backend";

interface IState {
  isFetching: boolean;
  categoryName: string;
  page: number;
  offset: number;
  total: number;
  result: ICategory[];
}
// First, create the thunk
export const fetchCategory: any = createAsyncThunk(
  "category/fetchCategory",
  async (query: string) => {
    const response = await callFetchCategory(query);
    return response;
  }
);

const initialState: IState = {
  isFetching: true,
  categoryName: "",
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
    setCategoryPagination: (state, action) => {
      state.page = action.payload.page;
      state.total = action.payload.total;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCategory.pending, (state, action) => {
      state.isFetching = true;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.isFetching = false;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchCategory.fulfilled, (state, action) => {
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

export const { setActiveMenu, setCategoryPagination } = categorySlide.actions;

export default categorySlide.reducer;
