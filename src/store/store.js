import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import header from "../pages/header/HeaderSlice";
import mainData from '../pages/main/MainSlice'
import modal from '../elements/Modal/ModalSlice'


const store = configureStore({
  reducer: {counterReducer, header, mainData, modal},
  middleware: getDefaultMiddleware => getDefaultMiddleware(
      {
        serializableCheck: false,
      }
  ),
  devTools: process.env.NODE_ENV !== 'production',

})

export default store;

