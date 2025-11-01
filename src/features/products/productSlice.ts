import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Product } from "../../types/productTypes";
import { productApi } from "../../api/productApi";
import type { RootState } from "../../app/store";

// --------------------------------------
// State Definition
// --------------------------------------
interface State {
  list: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  categoryFilter: string;
}

const initialState: State = {
  list: [],
  loading: false,
  error: null,
  searchTerm: "",
  categoryFilter: "",
};

// --------------------------------------
// Async Thunks (CRUD)
// --------------------------------------

// 🔹 Fetch all products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await productApi.getAll();
  return res.data.products as Product[];
});

// 🔹 Add product
export const addProduct = createAsyncThunk(
  "products/add",
  async (payload: Partial<Product>) => {
    const res = await productApi.add(payload);
    return res.data as Product;
  }
);

// 🔹 Update product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }: { id: number; data: Partial<Product> }) => {
    const res = await productApi.update(id, data);
    return res.data as Product;
  }
);

// 🔹 Delete product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    await productApi.remove(id);
    return id;
  }
);

// --------------------------------------
// Slice
// --------------------------------------
const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch products";
      })

      // Add
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })

      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      });
  },
});

// --------------------------------------
// Exports
// --------------------------------------
export const { setSearchTerm, setCategoryFilter } = slice.actions;
export default slice.reducer;

// --------------------------------------
// Selectors
// --------------------------------------
export const selectProducts = (state: RootState) => state.products.list;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectError = (state: RootState) => state.products.error;
