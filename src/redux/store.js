import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import carsReducer from "./carSlice"; // Підключаємо безпосередньо carsReducer

// Налаштування персистентного ред'юсера
const persistConfig = {
  key: "cars", // Ім'я ключа для персистенції
  version: 1,
  storage, // Використання localStorage для збереження стану
};

// Створення персистентного ред'юсера
const persistedReducer = persistReducer(persistConfig, carsReducer);

// Створення стору з персистенцією
export const store = configureStore({
  reducer: {
    cars: persistedReducer, // Задаємо правильний ключ для ред'юсера
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
