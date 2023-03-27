import React, { useEffect, useState } from 'react';
import * as S from './Starred.style';
import { useCookies } from 'react-cookie';
import { useGetStarOfCurrentLoggedInUserQuery } from '../../redux/features/starred';
import DisplayStarredOnMap from '../../components/DisplayStarredOnMap/DisplayStarredOnMap';
import { useGetAirPollutionQuery } from '../../redux/features/airPollution';
import { useDispatch, useSelector } from 'react-redux';

function Starred() {
  const dispatch = useDispatch();
  const { activeSido } = useSelector((state) => state.sido);
  const [cookie] = useCookies(['airoverflow']);
  // console.log('cookie.airoverflow?.userId', cookie?.airoverflow?.userId);

  const loggedInUserId = cookie?.airoverflow?.userId;

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
    data: starredData,
    isLoading: isLoadingGetStarred,
    isError: isErrGetStarred,
  } = useGetStarOfCurrentLoggedInUserQuery();

  if (isLoadingGetStarred) {
    return <div>Loading...</div>;
  }

  if (isErrGetStarred) {
    return <div>Error loading starred data.</div>;
  }

  const starredDataEntries = starredData ? Object.entries(starredData) : [];
  const allStarredDataArr = starredDataEntries.map(([key, value]) => {
    return { id: key, value };
  });

  const loggedInUserData = allStarredDataArr.filter(
    (data) => data.value.userId === loggedInUserId
  );

  // console.log('loggedInUserData', loggedInUserData);
  // const APDataItems = APData?.response?.body?.items;
  // console.log('APDataItems', APDataItems);
  // console.log('starredDataEntries', starredDataEntries);

  // console.log('starredDataArr', starredDataArr);
  const starredSidoName = loggedInUserData.map((data) => {
    return {
      dmX: data.value.data.dmX,
      dmY: data.value.data.dmY,
      sidoName: data.value.data.sidoName,
      stationName: data.value.data.stationName,
    };
  });
  // console.log('starredSidoName', starredSidoName);
  // console.log('123', starredSidoName[0].stationName);

  ////////////////////////////////////
  // console.log('APData', APData);

  return (
    <>
      <DisplayStarredOnMap
        APData={APData}
        starredSidoName={starredSidoName}
        allStarredDataArr={allStarredDataArr}
        loggedInUserData={loggedInUserData}
      />
    </>
  );
}

export default Starred;
