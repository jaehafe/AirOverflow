import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const airPollutionApi = createApi({
  reducerPath: 'airPollutionApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc',
    baseUrl: `${import.meta.env.VITE_AIR_POLLUTION_BASE_URL}`,
  }),
  endpoints: (builder) => ({
    getAirPollution: builder.query({
      query: (params) => ({
        url: '/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',
        params: {
          serviceKey: `${import.meta.env.VITE_AIR_POLLUTION_API_KEY}`,
          returnType: 'json',
          numOfRows: params.numOfRows,
          pageNo: params.pageNo,
          sidoName: params.sidoName,
          ver: '1.0',
        },
      }),
    }),

    getStationName: builder.query({
      query: (params) => ({
        url: '/MsrstnInfoInqireSvc/getMsrstnList',
        params: {
          serviceKey: `${import.meta.env.VITE_AIR_POLLUTION_API_KEY}`,
          returnType: 'json',
          numOfRows: 100,
          pageNo: 1,
          addr: params.addr,
          stationName: params.stationName,
          ver: '1.0',
        },
      }),
    }),
  }),
});

export const { useGetAirPollutionQuery, useGetStationNameQuery } = airPollutionApi;
