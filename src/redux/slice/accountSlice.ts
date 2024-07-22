import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callFetchUser } from "../../config/api";

// First, create the thunk
export const fetchAccount: any = createAsyncThunk(
  "account/fetchAccount",
  async () => {
    const response = await callFetchUser();
    if (response?.data?.statusCode !== 401) {
      return response;
    }
  }
);

interface IState {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string;
  refreshToken: string;
  isRefreshToken: boolean;
  errorRefreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    address: string;
    role: string;
  };
}

const initialState: IState = {
  isAuthenticated: false,
  isLoading: true,
  accessToken: "",
  refreshToken: "",
  isRefreshToken: false,
  errorRefreshToken: "",
  user: {
    id: "",
    email: "",
    name: "",
    address: "",
    role: "",
  },
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUserLoginInfo: (state, action) => {
      localStorage.setItem("access_token", action?.payload?.accessToken);
      localStorage.setItem("refresh_token", action?.payload?.refreshToken);
      state.isAuthenticated = true;
      state.isLoading = false;
      state.accessToken = action?.payload?.accessToken;
      state.refreshToken = action?.payload?.refreshToken;
    },
    setLogoutAction: (state, action) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      state.isAuthenticated = false;
      state.accessToken = "";
      state.refreshToken = "";
      state.user.id = "";
      state.user.email = "";
      state.user.name = "";
      state.user.role = "";
    },
    setRefreshTokenAction: (state, action) => {
      state.isRefreshToken = action.payload?.status ?? false;
      state.errorRefreshToken = action.payload?.message ?? "";
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAccount.pending, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false;
        state.isLoading = true;
      }
    });

    builder.addCase(fetchAccount.fulfilled, (state, action) => {
      // state.user = state.user || {};
      if (action?.payload) {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user.id = action?.payload?.id;
        state.user.email = action?.payload?.email;
        state.user.name = action?.payload?.name;
        state.user.role = action?.payload?.role;
      }
    });

    builder.addCase(fetchAccount.rejected, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false;
        state.isLoading = false;
      }
    });
  },
});

export const { setUserLoginInfo, setLogoutAction, setRefreshTokenAction } =
  accountSlice.actions;

export default accountSlice.reducer;
