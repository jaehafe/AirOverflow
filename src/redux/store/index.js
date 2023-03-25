import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { airPollutionApi } from '../features/airPollution';
import { starredApi } from '../features/starred';

import sidoReducer from '../features/sidoSlice';

const store = configureStore({
  reducer: {
    sido: sidoReducer,
    [airPollutionApi.reducerPath]: airPollutionApi.reducer,
    [starredApi.reducerPath]: starredApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(airPollutionApi.middleware, starredApi.middleware),
});

setupListeners(store.dispatch);

export default store;
