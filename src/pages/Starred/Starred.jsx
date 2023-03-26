import React from 'react';
import * as S from './Starred.style';
import { useCookies } from 'react-cookie';
import { useGetStarOfCurrentLoggedInUserQuery } from '../../redux/features/starred';

function Starred() {
  const [cookie] = useCookies(['airoverflow']);
  console.log('cookie.airoverflow?.userId', cookie?.airoverflow?.userId);

  const userId = cookie?.airoverflow?.userId;

  const {
    data: starredData,
    isLoading: isLoadingGetStarred,
    isError: isErrGetStarred,
  } = useGetStarOfCurrentLoggedInUserQuery();

  console.log('starredData', Object.values(starredData));

  return <div>123</div>;
}

export default Starred;
