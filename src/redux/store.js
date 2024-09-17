import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./reduser"; // Импортируйте корневой редьюсер из вашего проекта

const store = configureStore({
  reducer: rootReducer,
  // другие настройки, если необходимо
});

const persistor = persistStore(store);

export { store, persistor };
