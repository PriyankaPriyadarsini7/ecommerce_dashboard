import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productSlice";
import wishlistsReducer from "../features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlists: wishlistsReducer,
  },
});
// const rootReducer = combineReducers({
//   products: productsReducer,
//   syncQueue: syncQueueReducer,
// });

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["products", "syncQueue"],
// };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
