import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  Action,
  combineReducers,
  configureStore,
  Reducer,
  ThunkAction,
} from "@reduxjs/toolkit";

import accountReducer from "./slice/accountSlice";
import categoryReducer from "./slice/categorySlice";
import productReducer from "./slice/productSlice";
import purchaseReducer from "./slice/purchaseSlice";
import purchaseAdminReducer from "./slice/purchaseAdminSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["account"],
};

// export const store = configureStore({
//   reducer: {
//     account: accountSlice.reducer,
//     category: categoryReducer,
//     product: productReducer,
//     purchase: purchaseReducer,
//     purchaseAdmin: purchaseAdminReducer,
//   },
// });

const rootReducer = combineReducers({
  account: accountReducer,
  category: categoryReducer,
  product: productReducer,
  purchase: purchaseReducer,
  purchaseAdmin: purchaseAdminReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: any = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // bỏ qua kiểm tra tính tuần tự của redux-persist
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
