import React from 'react';
import {
  useGetAirPollutionQuery,
  useGetStationNameQuery,
} from '../../redux/features/airPollution';
// import { useGetAirStationQuery } from '../../redux/features/airStationSlice';
import * as S from './Second.style';

function Second() {
  const { data, error, isFetching, isLoading } = useGetAirPollutionQuery({
    pageNo: 1,
    sidoName: '서울',
    numOfRows: 10,
  });

  // const {
  //   data: stationData,
  //   error: stationErr,
  //   isFetching: stationFetching,
  //   isLoading: stationLoading,
  // } = useGetStationNameQuery({ addr: '서울' });
  // , stationName: '종로구' }

  // const items = stationData?.response?.body?.items;
  // if (isFetching) {
  //   return <div>isFetching ...</div>;
  // }

  // if (error) {
  //   return <div>{error.message}</div>;
  // }

  console.log('data', data);
  // console.log('stationData', items);
  return <div>123</div>;
}

export default Second;
