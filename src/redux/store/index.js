import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { airPollutionApi } from '../features/airPollution';
import { starredApi } from '../features/starred';
import { kakaoLoginApi } from '../features/kakaoLogin';

import sidoReducer from '../features/sidoSlice';
import userReducer from '../features/userSlice';
import apDataReducer from '../features/apDataSlice';

const store = configureStore({
  reducer: {
    sido: sidoReducer,
    userInfo: userReducer,
    apData: apDataReducer,
    [airPollutionApi.reducerPath]: airPollutionApi.reducer,
    [starredApi.reducerPath]: starredApi.reducer,
    [kakaoLoginApi.reducerPath]: kakaoLoginApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      airPollutionApi.middleware,
      starredApi.middleware,
      kakaoLoginApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
