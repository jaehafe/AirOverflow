import React, { useEffect } from 'react';
import * as S from './Third.style';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useGetUserTokenInfoQuery,
  useGetUserTokenMutation,
} from '../../redux/features/kakaoLogin';
import { setUserInfo } from '../../redux/features/userSlice';
import { message, Spin } from 'antd';

function Third() {
  const [, setCookie] = useCookies();
  const navigate = useNavigate();
  const { activeUser } = useSelector((state) => state.userInfo);
  console.log('activeUser', activeUser);
  const dispatch = useDispatch();

  const [
    getToken,
    {
      data: tokenData,
      isLoading: getTokenLoading,
      error: getTokenError,
      isSuccess: getTokenSuccess,
    },
  ] = useGetUserTokenMutation();
  const {
    data: tokenInfoData,
    isLoading: getTokenInfoLoading,
    error: getTokenInfoError,
  } = useGetUserTokenInfoQuery(tokenData?.access_token, {
    skip: !tokenData?.access_token,
  });
  console.log('tokenData!!!!!!!!!!!!!!', tokenData);
  let code = new URL(window.location.href).searchParams.get('code');
  console.log('code', code);

  // useEffect(() => {
  //   if(getTokenSuccess) {

  //   }
  // })

  // const onSuccess = (isFirst, accessToken) => {
  //   setCookie('airoverflow', accessToken, {
  //     path: '/',
  //     sameSite: 'lax',
  //     secure: true,
  //   });
  //   if (isFirst) navigate('/second');
  //   else navigate('/');
  // };

  // const onError = () => {
  //   message
  //     .error('로그인에 문제가 발생했습니다.\n잠시 후 다시 시도해 주세요 :(')
  //     .then(() => navigate('/'));
  // };

  useEffect(() => {
    if (code) {
      getToken(code);
    }
  }, [code, getToken]);

  useEffect(() => {
    if (getTokenSuccess) {
      if (tokenData?.access_token) {
        const { access_token, id_token } = tokenData;
        localStorage.setItem('access_token', JSON.stringify({ access_token, id_token }));
        setCookie('airoverflow', id_token, {
          path: '/',
          sameSite: 'lax',
          secure: true,
        });

        message
          .success('로그인에 성공했습니다. 원을 클릭해서 즐겨찾기에 저장해보세요.')
          .then(() => navigate('/first'));
        // navigate('/first');
      }
    }
  }, [tokenData]);

  console.log('tokenInfoData', tokenInfoData);

  useEffect(() => {
    if (getTokenError || getTokenInfoError) {
      message
        .error('로그인에 문제가 발생했습니다.\n잠시 후 다시 시도해 주세요 :(')
        .then(() => navigate('/'));
    }
  });

  useEffect(() => {
    dispatch(setUserInfo(code));
  }, []);

  return (
    <S.Container>
      {(getTokenInfoLoading || getTokenLoading) && <Spin size="large" />}
    </S.Container>
  );
}

export default Third;
