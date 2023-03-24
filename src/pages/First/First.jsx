import React from 'react';
import DisplayDataOnMap from '../../components/DisplayDataOnMap/DisplayDataOnMap';
import { useGetStationNameQuery } from '../../redux/features/airPollution';

function First() {
  const {
    data: stationData,
    error: stationErr,
    isFetching: stationFetching,
    isLoading: stationLoading,
  } = useGetStationNameQuery({ addr: '서울' });

  // const items = stationData?.response?.body?.items;
  // console.log('items', items);

  if (stationFetching) {
    return <div>isFetching ...</div>;
  }

  if (stationErr) {
    return <div>{stationErr.message}</div>;
  }

  return (
    <div>
      <DisplayDataOnMap
        stationData={stationData}
        stationErr={stationErr}
        stationFetching={stationFetching}
      />
    </div>
  );
}

export default First;
