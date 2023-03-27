import React, { useEffect, useMemo } from 'react';
import * as S from './Search.style';
import DisplayDataOnMap from '../../components/DisplayDataOnMap/DisplayDataOnMap';
import {
  useGetAirPollutionQuery,
  useGetStationNameQuery,
} from '../../redux/features/airPollution';
import { getSidoName } from '../../utils/mapUtils';
import { useSelector, useDispatch } from 'react-redux';
import { setSidoName } from '../../redux/features/sidoSlice';

import { useAddStarMutation, useDeleteStarMutation } from '../../redux/features/starred';
import { Spin } from 'antd';

function Search() {
  const dispatch = useDispatch();
  const { activeSido } = useSelector((state) => state.sido);
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

  const {
    data: stationData,
    error: stationErr,
    isFetching: stationFetching,
    isLoading: stationLoading,
  } = useGetStationNameQuery({
    pageNo: activeSido.pageNo,
    addr: activeSido.sidoName,
    stationName: activeSido.stationName,
    numOfRows: activeSido.numOfRows,
  });

  const [addStar, { isLoading: isAdding }] = useAddStarMutation();
  const [deleteStar, { isLoading: isDeleting }] = useDeleteStarMutation();

  if (stationLoading || APIsLoading || stationFetching || APIsFetching) {
    return (
      <S.SpinContainer>
        <Spin size="large" />
      </S.SpinContainer>
    );
  }

  if (stationErr) {
    return <div>{stationErr.message}</div>;
  }

  const stationDataItems = stationData?.response?.body?.items;
  const APitems = APData?.response?.body?.items;

  if (!stationDataItems || !APitems) {
    return <div>Data is not ready</div>;
  }
  const sidoStationName = APitems.map((item) => item.stationName);

  const handleSidoChange = (selectedOption) => {
    dispatch(
      setSidoName({
        ...activeSido,
        sidoName: selectedOption,
        stationName: '',
      })
    );
  };

  const handleStationName = (selectedOption) => {
    console.log(selectedOption);
    dispatch(
      setSidoName({
        ...activeSido,
        stationName: selectedOption,
      })
    );
  };

  const sidoNameOptions = () => {
    return getSidoName.map((sido) => ({
      label: sido,
      value: sido,
      disabled: sido === '전국',
    }));
  };

  const stationOptions = () => {
    return [
      { label: '전체보기', value: '' },
      ...sidoStationName.map((station) => ({
        label: station,
        value: station,
      })),
    ];
  };

  return (
    <S.Container>
      {/* select */}
      <S.HeaderSelectWrapper>
        <h3>어디에 살고 계신가요?</h3>
        <S.SelectWrapper>
          <S.SidoSelect
            placeholder="시/도 선택"
            onChange={handleSidoChange}
            value={activeSido.sidoName}
            options={sidoNameOptions()}
          />
          <S.StationNameSelect
            placeholder="지역 선택"
            value={activeSido.stationName}
            onChange={handleStationName}
            options={stationOptions()}
          />
        </S.SelectWrapper>
      </S.HeaderSelectWrapper>
      <DisplayDataOnMap
        APData={APData}
        stationData={stationData}
        stationErr={stationErr}
        stationFetching={stationFetching}
        addStar={addStar}
        isAdding={isAdding}
        deleteStar={deleteStar}
        isDeleting={isDeleting}
      />
    </S.Container>
  );
}

export default Search;
