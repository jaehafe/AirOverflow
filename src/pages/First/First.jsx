import React, { useMemo } from 'react';
import DisplayDataOnMap from '../../components/DisplayDataOnMap/DisplayDataOnMap';
import {
  useGetAirPollutionQuery,
  useGetStationNameQuery,
} from '../../redux/features/airPollution';
import { getSidoName } from '../../utils/getSidoName';
import * as S from './First.style';
import { useSelector } from 'react-redux';

function First() {
  const { activeSido } = useSelector((state) => state.sido);
  console.log('activeSido', activeSido);
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

  // const items = stationData?.response?.body?.items;
  // console.log('items', items);

  if (stationLoading || APIsLoading || stationFetching || APIsFetching) {
    return <div>isFetching ...</div>;
  }

  if (stationErr) {
    return <div>{stationErr.message}</div>;
  }

  const stationDataItems = stationData?.response?.body?.items;
  const APitems = APData?.response?.body?.items;
  console.log('APitems', APitems);
  console.log('stationDataItems', stationDataItems);

  if (!stationDataItems || !APitems) {
    return <div>Data is not ready</div>;
  }
  const sidoStationName = stationDataItems.map((item) => item.stationName);
  console.log('sidoStationName', sidoStationName);

  /////////////////////////////////////////

  // const SidoOptions = useMemo(() => getSidoName(), []);

  return (
    <S.Container>
      {/* select */}
      <S.HeaderSelectWrapper>
        <h3>어디에 살고 계신가요?</h3>
        <S.SelectWrapper>
          <S.SidoSelect
            placeholder="시/도 선택"
            options={getSidoName.map((sido) => ({
              label: sido,
              value: sido,
            }))}
          />
          <S.StationNameSelect
            options={sidoStationName.map((station) => ({
              label: station,
              value: station,
            }))}
          />
        </S.SelectWrapper>
      </S.HeaderSelectWrapper>
      <DisplayDataOnMap
        APData={APData}
        stationData={stationData}
        stationErr={stationErr}
        stationFetching={stationFetching}
      />
    </S.Container>
  );
}

export default First;
