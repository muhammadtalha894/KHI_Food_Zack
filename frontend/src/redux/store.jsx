import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { userApi } from "./reducers/userReducer";
import { contactApi } from "./reducers/contactReducer";
import { orderApi } from "./reducers/orderReducer";
import { itemApi } from "../redux/reducers/itemReducer";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      contactApi.middleware,
      orderApi.middleware,
      itemApi.middleware,
    ]),
});

export default store;
