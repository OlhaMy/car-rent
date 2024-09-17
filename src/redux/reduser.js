import { combineReducers } from "@reduxjs/toolkit";
import carReducer from "./carSlice";

const rootReducer = combineReducers({
  car: carReducer,
});

export default rootReducer;
