import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../../redux/features/userSlice';

export const kakaoLoginConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
};

function Third() {
  const navigate = useNavigate();
  const { activeUser } = useSelector((state) => state.userInfo);
  console.log('activeUser', activeUser);
  const dispatch = useDispatch();

  let code = new URL(window.location.href).searchParams.get('code');
  console.log('code', code);

  const tokenData = {
    grant_type: 'authorization_code',
    client_id: `${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
    redirect_uri: 'http://localhost:5173/third',
    code,
  };
  const params = new URLSearchParams(tokenData);

  const getToken = async () => {
    try {
      const res = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        params.toString(),
        kakaoLoginConfig
      );
      console.log('res', res);
    } catch (error) {
      console.log('소셜로그인 에러', error);
      // window.alert('로그인에 실패하였습니다.');
      // navigate('/');
    }
  };

  useEffect(() => {
    getToken();
  }, [code]);

  useEffect(() => {
    dispatch(setUserInfo(code));
  }, []);

  return <div>Third</div>;
}

export default Third;
