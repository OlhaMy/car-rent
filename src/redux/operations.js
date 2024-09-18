import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Встановлюємо базову URL-адресу і параметри для пагінації
axios.defaults.baseURL = "https://66e9b78187e41760944a8028.mockapi.io/";
axios.defaults.params = { page: 1, limit: 12 };

// Функція для отримання всіх автомобілів
export const fetchCarsThunk = createAsyncThunk(
  "cars/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("cars");
      console.log("Fetched data:", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Функція для завантаження більше автомобілів (пагінація)
export const fetchMoreCarsThunk = createAsyncThunk(
  "cars/loadMoreCars",
  async (page, thunkAPI) => {
    try {
      // Використовуємо параметри для запиту з новою сторінкою
      const { data } = await axios.get("cars", { params: { page } });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
