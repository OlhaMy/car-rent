import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://66e9519787e417609448f3f8.mockapi.io/id",
});

export const fetchCatalog = createAsyncThunk(
  "car/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get("/car");
      console.log("Fetched data:", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMakes = createAsyncThunk(
  "car/fetchMakes",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get("/adverts");

      const makes = [...new Set(data.map((car) => car.make))];
      return makes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPrice = createAsyncThunk(
  "car/fetchPrice",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get("/adverts");

      const price = [...new Set(data.map((car) => car.rentalPrice))];
      return price;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
