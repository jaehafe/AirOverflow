import React from 'react';
import DisplayDataOnMap from '../../components/DisplayDataOnMap/DisplayDataOnMap';
import {
  useGetAirPollutionQuery,
  useGetStationNameQuery,
} from '../../redux/features/airPollution';

function First() {
  const {
    data: APData,
    error: APErr,
    isFetching: APIsFetching,
    isLoading: APIsLoading,
  } = useGetAirPollutionQuery({
    pageNo: 1,
    sidoName: '서울',
    numOfRows: 100,
  });

  const {
    data: stationData,
    error: stationErr,
    isFetching: stationFetching,
    isLoading: stationLoading,
  } = useGetStationNameQuery({ pageNo: 1, addr: '서울', numOfRows: 100 });

  // const items = stationData?.response?.body?.items;
  // console.log('items', items);

  if (stationFetching) {
    return <div>isFetching ...</div>;
  }

  if (stationErr) {
    return <div>{stationErr.message}</div>;
  }
  // console.log('APData', APData);
  // console.log('stationData', stationData);

  return (
    <div>
      <DisplayDataOnMap
        APData={APData}
        stationData={stationData}
        stationErr={stationErr}
        stationFetching={stationFetching}
      />
    </div>
  );
}

export default First;
