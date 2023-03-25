import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../redux/features/userSlice';

function Third() {
  const { activeUser } = useSelector((state) => state.userInfo);
  console.log('activeUser', activeUser);
  const dispatch = useDispatch();

  let code = new URL(window.location.href).searchParams.get('code');
  console.log('code', code);

  useEffect(() => {
    dispatch(setUserInfo(code));
  }, []);

  return <div>Third</div>;
}

export default Third;
