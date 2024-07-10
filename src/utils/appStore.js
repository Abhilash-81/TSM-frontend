import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "./userSlice.js";
import taskReducer from "./taskSlice.js"

const persistConfig = {
  key: "root",
  storage,
};
const reducer = combineReducers({
  user: userReducer,
  tasks:taskReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const appStore = configureStore({
  reducer: persistedReducer,
});

export default appStore;
