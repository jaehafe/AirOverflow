import React, { useEffect, useState } from 'react';
import * as S from './Starred.style';
import { useCookies } from 'react-cookie';
import { useGetStarOfCurrentLoggedInUserQuery } from '../../redux/features/starred';
import DisplayStarredOnMap from '../../components/DisplayStarredOnMap/DisplayStarredOnMap';
import { Spin } from 'antd';

function Starred() {
  const [cookies] = useCookies(['airoverflow']);
  const loggedInUserId = cookies?.airoverflow?.userId;

  const {
    data: starredData,
    isLoading: isLoadingGetStarred,
    isError: isErrGetStarred,
    refetch: refetchStarred,
  } = useGetStarOfCurrentLoggedInUserQuery({ refetchOnMountOrArgChange: true });

  useEffect(() => {
    refetchStarred();
    console.log('refecth!!!!!!!!!!!!!!');
  }, [starredData]);

  if (isLoadingGetStarred) {
    return (
      <S.SpinContainer>
        <Spin size="large" />
      </S.SpinContainer>
    );
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
      <DisplayStarredOnMap
        loggedInUserData={loggedInUserData}
        refetchStarred={refetchStarred}
      />
    </>
  );
}

export default Starred;
