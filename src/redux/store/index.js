import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { airPollutionApi } from '../features/airPollution';
import counterSlice from '../features/countSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice,
    [airPollutionApi.reducerPath]: airPollutionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(airPollutionApi.middleware),
});

setupListeners(store.dispatch);

export default store;
