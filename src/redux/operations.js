import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://66e9b78187e41760944a8028.mockapi.io/";
axios.defaults.params = { page: 1, limit: 12 };

export const fetchCarsThunk = createAsyncThunk(
  "cars/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("cars");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMoreCarsThunk = createAsyncThunk(
  "cars/loadMoreCars",
  async (page, thunkAPI) => {
    try {
      const { data } = await axios.get("cars", { params: { page } });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
