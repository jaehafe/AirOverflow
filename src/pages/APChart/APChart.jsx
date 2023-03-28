import React from 'react';
import {
  useGetAirPollutionQuery,
  useGetStationStatusQuery,
} from '../../redux/features/airPollution';
import * as S from './APChart.style';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { getDataTerm, getSidoName } from '../../utils/mapUtils';
import { setSidoName } from '../../redux/features/sidoSlice';
import { setStationData } from '../../redux/features/apDataSlice';

function APChart() {
  const dispatch = useDispatch();
  const { activeStation } = useSelector((state) => state.apData);
  const { activeSido } = useSelector((state) => state.sido);
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

  // console.log('activeSido', activeSido);
  const {
    data: APData,
    error: APErr,
    isFetching: APIsFetching,
    isLoading: APIsLoading,
  } = useGetAirPollutionQuery({
    pageNo: activeSido.pageNo, // 1
    sidoName: activeSido.sidoName, // 서울
    numOfRows: activeSido.numOfRows, // 100
  });

  if (isLoadingStationData) {
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  }

  console.log('stationData', stationData);

  const APitems = APData?.response?.body?.items;
  if (!APitems) {
    return <div>Data is not ready</div>;
  }
  const sidoStationName = APitems?.map((item) => item.stationName);

  const sidoNameOptions = () => {
    return getSidoName.map((sido) => ({
      label: sido,
      value: sido,
      disabled: sido === '전국',
    }));
  };

  const stationOptions = () => {
    return [
      { label: '측정소 선택', value: '' },
      ...sidoStationName.map((station) => ({
        label: station,
        value: station,
      })),
    ];
  };

  const DataTermOptions = () => {
    return [
      { label: '기간 선택', value: '' },
      ...getDataTerm.map((term) => ({
        label: term.label,
        value: term.value,
      })),
    ];
  };

  const handleSidoChange = (selectedOption) => {
    dispatch(
      setSidoName({
        ...activeSido,
        sidoName: selectedOption,
        stationName: '',
      })
    );
    // 다른 시/도 선택 시 activeStation초기화
    dispatch(
      setStationData({
        ...activeStation,
        stationName: '',
        dataTerm: '',
      })
    );

    console.log('activeStation', activeStation);
  };

  const handleStationName = (selectedOption) => {
    console.log(selectedOption);
    dispatch(
      setStationData({
        ...activeStation,
        stationName: selectedOption,
      })
    );
  };

  const handleStationData = (selectedOption) => {
    console.log(selectedOption);
    dispatch(
      setStationData({
        ...activeStation,
        dataTerm: selectedOption,
      })
    );
  };

  return (
    <S.Container>
      <S.SelectWrapper>
        <S.SidoSelect
          placeholder="시/도 선택"
          onChange={handleSidoChange}
          value={activeSido.sidoName}
          options={sidoNameOptions()}
        />
        <S.StationNameSelect
          placeholder="지역 선택"
          value={activeStation.stationName}
          onChange={handleStationName}
          options={stationOptions()}
        />
        <S.DataTermSelect
          placeholder="데이터 기간 선택"
          value={activeStation.dataTerm}
          onChange={handleStationData}
          options={DataTermOptions()}
        />
      </S.SelectWrapper>
      <S.ChartContainer>123</S.ChartContainer>
    </S.Container>
  );
}

export default APChart;
