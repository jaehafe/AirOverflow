import { message } from 'antd';
import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const [cookie] = useCookies(['airoverflow']);

  const access_token = cookie?.airoverflow?.access_token;
  console.log('access_token', cookie?.airoverflow?.access_token);

  if (!access_token) {
    message.info('즐겨찾기 페이지는 로그인 후 이용이 가능합니다.');
    return <Navigate to="/" replace />;
  }
  return children;
}
