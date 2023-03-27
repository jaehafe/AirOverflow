import React, { useEffect, useState } from 'react';
import * as S from './Starred.style';
import { useCookies } from 'react-cookie';
import { useGetStarOfCurrentLoggedInUserQuery } from '../../redux/features/starred';
import DisplayStarredOnMap from '../../components/DisplayStarredOnMap/DisplayStarredOnMap';

function Starred() {
  const [cookie] = useCookies(['airoverflow']);

  const loggedInUserId = cookie?.airoverflow?.userId;

  const {
    data: starredData,
    isLoading: isLoadingGetStarred,
    isError: isErrGetStarred,
    refetch: refetchStarred,
  } = useGetStarOfCurrentLoggedInUserQuery({ refetchOnMountOrArgChange: false });

  useEffect(() => {
    refetchStarred();
  }, [loggedInUserId, refetchStarred]);

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
