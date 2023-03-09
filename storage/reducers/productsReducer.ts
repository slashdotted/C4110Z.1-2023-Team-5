import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../constants/Types";

export interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
  },
});

export const { addProduct } = productsSlice.actions;

export default productsSlice.reducer;
