import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal';
import * as S from './Sidebar.style';

import { message } from 'antd';
import { useLogoutKakaoMutation } from '../../redux/features/kakaoLogin';
import { useAsyncToast } from '../../hooks/useToast';

function Sidebar({ isOpenLoginModal, setIsOpenLoginModal }) {
  const { asyncToast } = useAsyncToast();
  const [logoutKakao, { isLoading: isLoadingKakaoLogout }] = useLogoutKakaoMutation();
  const [cookie] = useCookies(['airoverflow']);
  const [, , removeCookie] = useCookies(['airoverflow']);

  const navigate = useNavigate();

  const handleLogout = () => {
    const messages = {
      loading: '로그아웃 중...',
      success: () => '로그아웃 성공',
      error: () => '로그아웃 실패',
    };

    try {
      const logoutResult = logoutKakao(cookie?.airoverflow?.access_token).unwrap();
      console.log('logoutResult', logoutResult);

      asyncToast(logoutResult, null, messages);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      removeCookie('airoverflow');
    }
  };

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
        {cookie.airoverflow?.access_token ? (
          <S.AsideLogout onClick={handleLogout}>로그아웃 하기</S.AsideLogout>
        ) : (
          <S.AsideLogin onClick={() => setIsOpenLoginModal(true)}>
            로그인 하기
          </S.AsideLogin>
        )}
      </S.AsideMemberWrapper>

      {/*  */}
      <S.AsideMenu>
        <S.AsideMenuTitle>미세먼지 검색</S.AsideMenuTitle>
        <S.AsideMenuSubtitle onClick={() => navigate('/')}>
          미세먼지 지도
          <S.SearchBalloon>검색하기</S.SearchBalloon>
        </S.AsideMenuSubtitle>
      </S.AsideMenu>
      {/*  */}
      <S.AsideMenu>
        <S.AsideMenuTitle>즐겨찾기</S.AsideMenuTitle>
        <S.AsideMenuSubtitle onClick={() => navigate('/starred')}>
          즐겨찾는 지역
          <S.StarredBalloon>회원전용</S.StarredBalloon>
        </S.AsideMenuSubtitle>
      </S.AsideMenu>
      {/*  */}
      <S.AsideMenu>
        <S.AsideMenuTitle>차트</S.AsideMenuTitle>
        <S.AsideMenuSubtitle onClick={() => navigate('/apchart')}>
          미세먼지 현황
          <S.StarredBalloon>현황차트</S.StarredBalloon>
        </S.AsideMenuSubtitle>
      </S.AsideMenu>
    </S.Container>
  );
}

export default Sidebar;
