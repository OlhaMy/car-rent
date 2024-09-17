import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMakes,
  fetchPrice,
  fetchCatalog,
} from "../services/apiMockapi.js";

const initialState = {
  cars: [],
  favorites: [],
  makes: [],
  prices: [],
  status: "idle",
  error: null,
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const car = state.cars.find((car) => car.id === action.payload);
      if (car) {
        car.isFavorite = !car.isFavorite;
        if (car.isFavorite) {
          state.favorites.push(car);
        } else {
          state.favorites = state.favorites.filter((fav) => fav.id !== car.id);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMakes.fulfilled, (state, action) => {
        state.makes = action.payload;
      })
      .addCase(fetchPrice.fulfilled, (state, action) => {
        state.prices = action.payload;
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.cars = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const { toggleFavorite } = carSlice.actions;
export default carSlice.reducer;
