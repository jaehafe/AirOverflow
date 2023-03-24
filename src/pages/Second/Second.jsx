import React from 'react';
import { useGetAirPollutionQuery } from '../../redux/features/airPollution';
import * as S from './Second.style';

function Second() {
  const { data, error, isFetching, isLoading } = useGetAirPollutionQuery({
    sidoName: '서울',
  });

  if (isFetching) {
    return <div>isFetching ...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  console.log('data', data);
  return <div>123</div>;
}

export default Second;
