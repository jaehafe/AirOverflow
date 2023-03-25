import React from 'react';
import DisplayDataOnMap from '../../components/DisplayDataOnMap/DisplayDataOnMap';
import {
  useGetAirPollutionQuery,
  useGetStationNameQuery,
} from '../../redux/features/airPollution';
import * as S from './First.style';

function First() {
  const {
    data: APData,
    error: APErr,
    isFetching: APIsFetching,
    isLoading: APIsLoading,
  } = useGetAirPollutionQuery({
    pageNo: 1,
    sidoName: '부산',
    numOfRows: 100,
  });

  const {
    data: stationData,
    error: stationErr,
    isFetching: stationFetching,
    isLoading: stationLoading,
  } = useGetStationNameQuery({
    pageNo: 1,
    addr: '부산',
    stationName: '',
    numOfRows: 100,
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

  /////////////////////////////////////////

  return (
    <S.Container>
      {/* select */}
      <S.HeaderSelectWrapper>123123123123123123123123123</S.HeaderSelectWrapper>
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
