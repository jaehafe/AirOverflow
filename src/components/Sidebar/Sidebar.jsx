import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal';
import * as S from './Sidebar.style';
import AsideMenu from '../AsideMenu/AsideMenu';

import { message } from 'antd';
import { useLogoutKakaoMutation } from '../../redux/features/kakaoLogin';
import { useAsyncToast } from '../../hooks/useToast';

function Sidebar({ isOpenLoginModal, setIsOpenLoginModal }) {
  const { asyncToast } = useAsyncToast();
  const [logoutKakao, { isLoading: isLoadingKakaoLogout }] = useLogoutKakaoMutation();
  const [cookies, setCookies, removeCookie] = useCookies(['airoverflow']);

  const navigate = useNavigate();

  const handleLogout = () => {
    const messages = {
      loading: '로그아웃 중...',
      success: () => '로그아웃 성공',
      error: () => '로그아웃 실패',
    };

    try {
      const logoutResult = logoutKakao(cookies?.airoverflow?.access_token).unwrap();
      console.log('logoutResult', logoutResult);

      asyncToast(logoutResult, null, messages);
      removeCookie('airoverflow', {
        path: '/',
        sameSite: 'strict',
        secure: true,
      });
      window.location.reload();
      // navigate('/apchart');
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const NavList = [
    {
      navigate: () => navigate('/'),
      title: '미세먼지 검색',
      subTitle: '미세먼지 지도',
      balloon: '검색하기',
    },
    {
      navigate: () => navigate('/starred'),
      title: '즐겨찾기',
      subTitle: '즐겨찾는 지역',
      balloon: '회원전용',
    },
    {
      navigate: () => navigate('/apchart'),
      title: '차트',
      subTitle: '미세먼지 현황',
      balloon: '현황차트',
    },
  ];

  return (
    <S.Container>
      {isOpenLoginModal && <LoginModal setIsOpenLoginModal={setIsOpenLoginModal} />}
      <S.AsideLogo>
        <S.StyledLink to="/">
          <S.Logo src="/logo.svg" />
          <S.LogoTextWrapper>
            <h3>Air </h3>
            <h3>Overflow</h3>
          </S.LogoTextWrapper>
        </S.StyledLink>
      </S.AsideLogo>
      {/*  */}
      <S.AsideMemberWrapper>
        {cookies.airoverflow?.access_token ? (
          <S.AsideLogout onClick={handleLogout}>로그아웃 하기</S.AsideLogout>
        ) : (
          <S.AsideLogin onClick={() => setIsOpenLoginModal(true)}>로그인 하기</S.AsideLogin>
        )}
      </S.AsideMemberWrapper>

      {NavList.map((list) => (
        <AsideMenu
          key={list.title}
          title={list.title}
          subTitle={list.subTitle}
          balloon={list.balloon}
          navigate={list.navigate}
        />
      ))}
    </S.Container>
  );
}

export default Sidebar;
