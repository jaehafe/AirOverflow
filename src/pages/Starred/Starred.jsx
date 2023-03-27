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
    data: starredData,
    isLoading: isLoadingGetStarred,
    isError: isErrGetStarred,
  } = useGetStarOfCurrentLoggedInUserQuery({ refetchOnMountOrArgChange: true });

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

  return (
    <>
      <DisplayStarredOnMap loggedInUserData={loggedInUserData} />
    </>
  );
}

export default Starred;
