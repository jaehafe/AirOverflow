import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const airPollutionApi = createApi({
  reducerPath: 'airPollutionApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc',
    baseUrl: `${import.meta.env.VITE_AIR_POLLUTION_BASE_URL}`,
  }),
  endpoints: (builder) => ({
    getAirPollution: builder.query({
      query: ({ sidoName }) => ({
        url: '/getCtprvnRltmMesureDnsty',
        params: {
          serviceKey: `${import.meta.env.VITE_AIR_POLLUTION_API_KEY}`,
          returnType: 'json',
          numOfRows: 100,
          pageNo: 1,
          sidoName,
          ver: '1.0',
        },
      }),
    }),
  }),
});

export const { useGetAirPollutionQuery } = airPollutionApi;
