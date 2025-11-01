import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/productTypes";

type FavState = { list: Product[] };
const stored = localStorage.getItem("wishlists");
const initialState: FavState = { list: stored ? JSON.parse(stored) : [] };

const slice = createSlice({
  name: "wishlists",
  initialState,
  reducers: {
    toggleWishlists(state, action: PayloadAction<Product>) {
      const user = action.payload;
      const exists = state.list.some((u) => u.id === user.id);
      state.list = exists
        ? state.list.filter((u) => u.id !== user.id)
        : [...state.list, user];
      localStorage.setItem("wishlists", JSON.stringify(state.list));
    },
    clearWishlists(state) {
      state.list = [];
      localStorage.removeItem("wishlists");
    },
  },
});

export const { toggleWishlists, clearWishlists } = slice.actions;
export default slice.reducer;
