import { message } from 'antd';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const [cookies] = useCookies(['airoverflow']);

  const access_token = cookies?.airoverflow?.access_token;

  useEffect(() => {
    if (!access_token) {
      message.info('즐겨찾기 페이지는 로그인 후 이용이 가능합니다.');
    }
  }, [access_token]);

  if (!access_token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
