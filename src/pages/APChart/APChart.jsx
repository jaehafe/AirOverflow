import React from 'react';
import { useGetStationStatusQuery } from '../../redux/features/airPollution';
import * as S from './APChart.style';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

function APChart() {
  const dispatch = useDispatch();
  const { activeStation } = useSelector((state) => state.apData);
  const {
    data: stationData,
    isLoading: isLoadingStationData,
    isError: isErrStationData,
  } = useGetStationStatusQuery({
    numOfRows: activeStation.numOfRows,
    pageNo: activeStation.pageNo,
    stationName: activeStation.stationName,
    dataTerm: activeStation.dataTerm,
  });

  if (isLoadingStationData) {
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  }

  console.log('stationData', stationData);
  return <S.Container>123</S.Container>;
}

export default APChart;
