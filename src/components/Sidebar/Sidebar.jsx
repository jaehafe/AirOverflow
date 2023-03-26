import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal';
import * as S from './Sidebar.style';

import { message } from 'antd';

function Sidebar({ isOpenLoginModal, setIsOpenLoginModal }) {
  const [cookie] = useCookies(['airoverflow']);
  const [, , removeCookie] = useCookies(['airoverflow']);
  console.log('airoverflow cookie', cookie);

  const navigate = useNavigate();
  const handleNavigateToSearch = () => {
    navigate('/first');
  };

  const handleLogout = () => {
    console.log('123');
    // removeCookie('airoverflow', { path: '/' }, () => {
    //   message.success('로그아웃 하였습니다.');
    // });
    removeCookie('airoverflow');
    message.success('로그아웃 하였습니다.');
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
        <S.AsideMenuSubtitle onClick={handleNavigateToSearch}>
          미세먼지 지도
        </S.AsideMenuSubtitle>
        {/* <S.AsideMenuSubtitle>
          IT 스킬 체크업
          <S.StyledAiOutlineHome />
        </S.AsideMenuSubtitle> */}
      </S.AsideMenu>
      {/*  */}
      <S.AsideMenu>
        <S.AsideMenuTitle>즐겨찾기</S.AsideMenuTitle>
        <S.AsideMenuSubtitle onClick={() => navigate('/second')}>
          즐겨찾는 지역
        </S.AsideMenuSubtitle>
        {/* <S.AsideMenuSubtitle>
          IT 스킬 체크업
          <S.StyledAiOutlineHome />
        </S.AsideMenuSubtitle> */}
      </S.AsideMenu>
      <S.AsideMenu>
        <S.AsideMenuTitle>로그인</S.AsideMenuTitle>
        <S.AsideMenuSubtitle>로그인</S.AsideMenuSubtitle>
        {/* <S.AsideMenuSubtitle>
          IT 스킬 체크업
          <S.StyledAiOutlineHome />
        </S.AsideMenuSubtitle> */}
      </S.AsideMenu>
    </S.Container>
  );
}

export default Sidebar;
