import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import header from "../pages/header/HeaderSlice";


const store = configureStore({
  reducer: {counterReducer, header},
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',

})

export default store;
