import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../constants/Types";

export interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [
    {
      barcode: "5449000214911",
      product_name: "Coca Cola",
      brands: "Coca Cola",
      categories: "Beverages",
      image_url:
        "https://images.openfoodfacts.org/images/products/544/900/021/4911/front_en.119.400.jpg",
      ingredients_text:
        "sugar, water, carbon dioxide, citric acid, phosphoric acid, natural flavors, caffeine",
      ecoscore_grade: "b",
      nova_group: 1,
      nutriscore_grade: "a",
      nutrient_levels: {
        fat: "0%",
        salt: "0%",
        saturated_fat: "10.6%",
        sugars: "0%",
      },
    },
  ],
};

export const productsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      // update product if it already exists
      const index = state.products.findIndex(
        (product) => product.barcode === action.payload.barcode
      );

      if (index !== -1) {
        state.products[index] = action.payload;
      } else {
        state.products.push(action.payload);
      }
    },
  },
});

export const { addProduct } = productsSlice.actions;

export default productsSlice.reducer;
