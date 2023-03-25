import React, { useMemo } from 'react';
import DisplayDataOnMap from '../../components/DisplayDataOnMap/DisplayDataOnMap';
import {
  useGetAirPollutionQuery,
  useGetStationNameQuery,
} from '../../redux/features/airPollution';
import { getSidoName } from '../../utils/getSidoName';
import * as S from './First.style';
import { useSelector, useDispatch } from 'react-redux';
import { setSidoName } from '../../redux/features/sidoSlice';

function First() {
  const dispatch = useDispatch();
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

  const handleSidoChange = (selectedOption) => {
    // console.log('selectedOption', selectedOption);
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
            options={getSidoName.map((sido) => ({
              label: sido,
              value: sido,
            }))}
          />
          <S.StationNameSelect
            placeholder="지역 선택"
            value={activeSido.stationName}
            onChange={handleStationName}
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
