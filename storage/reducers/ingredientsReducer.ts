import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../constants/Types";

export interface IngredientsState {
  ingredients: Ingredient[];
}

const initialState: IngredientsState = {
  ingredients: [],
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      action.payload.name = action.payload.name.toLowerCase();

      const ingredientExists = state.ingredients.find(
        (ingredient) => ingredient.name === action.payload.name
      );

      if (!ingredientExists) {
        state.ingredients.push(action.payload);
      }
    },
  },
});

export const { addIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
