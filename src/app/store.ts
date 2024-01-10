import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "../features/auth/authSlice";
import { awardsApis } from "../services/apis/awardsApisSlice";
import { itemsSlice } from "../features/items/itemsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    items: itemsSlice.reducer,
    [awardsApis.reducerPath]: awardsApis.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(awardsApis.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
