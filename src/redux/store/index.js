import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/countSlice';

const store = configureStore({
  reducer: { counter: counterSlice },
});

export default store;
