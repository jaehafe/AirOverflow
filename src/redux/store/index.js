import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { airPollutionApi } from '../features/airPollution';
import counterSlice from '../features/countSlice';
import sidoReducer from '../features/sidoSlice';

const store = configureStore({
  reducer: {
    sido: sidoReducer,
    counter: counterSlice,
    [airPollutionApi.reducerPath]: airPollutionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(airPollutionApi.middleware),
});

setupListeners(store.dispatch);

export default store;
