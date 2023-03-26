import React from 'react';
import * as S from './Starred.style';
import { useCookies } from 'react-cookie';
import { useGetStarOfCurrentLoggedInUserQuery } from '../../redux/features/starred';

function Starred() {
  const [cookie] = useCookies(['airoverflow']);
  console.log('cookie.airoverflow?.userId', cookie?.airoverflow?.userId);

  const loggedInUserId = cookie?.airoverflow?.userId;

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

  const starredDataValues = starredData ? Object.values(starredData) : [];
  const loggedInUserData = starredDataValues.filter(
    (value) => value.userId === loggedInUserId
  );

  const loggedInUserValues = loggedInUserData.map((data) => {
    const {
      data: { dmX, dmY, stationName },
    } = data;
    return { dmX, dmY, stationName };
  });

  // console.log('loggedInUserData', loggedInUserData);
  // console.log('starredData', starredDataValues);
  console.log('loggedInUserValues', loggedInUserValues);

  return <div>123</div>;
}

export default Starred;
