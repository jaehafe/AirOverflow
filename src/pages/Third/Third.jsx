import axios from 'axios';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useGetUserTokenInfoQuery,
  useGetUserTokenMutation,
} from '../../redux/features/kakaoLogin';
import { setUserInfo } from '../../redux/features/userSlice';

function Third() {
  const [, setCookie] = useCookies();
  // const navigate = useNavigate();
  const { activeUser } = useSelector((state) => state.userInfo);
  console.log('activeUser', activeUser);
  const dispatch = useDispatch();

  const [
    getToken,
    { data: tokenData, error: getTokenError, isSuccess: getTokenSuccess },
  ] = useGetUserTokenMutation();
  const { data: tokenInfoData, error: getTokenInfoError } = useGetUserTokenInfoQuery(
    tokenData?.access_token,
    {
      skip: !tokenData?.access_token,
    }
  );

  let code = new URL(window.location.href).searchParams.get('code');
  console.log('code', code);

  const onSuccess = (isFirst, accessToken) => {
    setCookie('airoverflow', accessToken, {
      path: '/',
      sameSite: 'lax',
      secure: true,
    });
    if (isFirst) navigate('/second');
    else navigate('/');
  };

  const onError = () => {
    message
      .error('로그인에 문제가 발생했습니다.\n잠시 후 다시 시도해 주세요 :(')
      .then(() => navigate('/'));
  };

  useEffect(() => {
    if (code) {
      getToken({ code });
    }
  }, [code, getToken]);

  useEffect(() => {
    if (tokenData?.access_token) {
      localStorage.setItem('access_token', JSON.stringify(tokenData.access_token));
      console.log('tokenInfoData', tokenInfoData);
    }
  }, [tokenData]);

  useEffect(() => {
    dispatch(setUserInfo(code));
  }, []);

  return <div>Third</div>;
}

export default Third;

// export const kakaoLoginConfig = {
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
//   },
// };

// const tokenData = {
//   grant_type: 'authorization_code',
//   client_id: `${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
//   redirect_uri: 'http://localhost:5173/third',
//   code,
// };
// const params = new URLSearchParams(tokenData);

// const getToken = async () => {
//   try {
//     const res = await axios.post(
//       'https://kauth.kakao.com/oauth/token',
//       params.toString(),
//       kakaoLoginConfig
//     );
//     localStorage.setItem('access_token', JSON.stringify(res?.data?.access_token));
//     console.log('res', res);
//   } catch (error) {
//     console.log('소셜로그인 에러', error);
//     // window.alert('로그인에 실패하였습니다.');
//     // navigate('/');
//   }
// };

// const access_token = JSON.parse(localStorage.getItem('access_token')) || null;
// const getTokenInfo = async () => {
//   try {
//     const res = await axios.get('https://kapi.kakao.com/v1/user/access_token_info', {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     });
//     console.log('토큰 정보!!!!', res);
//   } catch (err) {
//     console.log(err);
//   }
// };

// useEffect(() => {
//   getTokenInfo();
// }, [access_token]);

// useEffect(() => {
//   getToken();
// }, [code]);

// useEffect(() => {
//   dispatch(setUserInfo(code));
// }, []);
