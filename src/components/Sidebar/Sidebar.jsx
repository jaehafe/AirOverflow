import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal';
import * as S from './Sidebar.style';

function Sidebar({ isOpenLoginModal, setIsOpenLoginModal }) {
  const navigate = useNavigate();
  const handleNavigateToSearch = () => {
    navigate('/first');
  };
  return (
    <S.Container>
      {isOpenLoginModal && <LoginModal setIsOpenLoginModal={setIsOpenLoginModal} />}
      <S.AsideLogo>
        <S.StyledLink to="/">
          <S.Logo src="../../../public/logo.svg" />
          <S.LogoTextWrapper>
            <h3>Air </h3>
            <h3>Overflow</h3>
          </S.LogoTextWrapper>
        </S.StyledLink>
      </S.AsideLogo>
      {/*  */}
      <S.AsideMember onClick={() => setIsOpenLoginModal(true)}>로그인 하기</S.AsideMember>
      {/*  */}
      <S.AsideMenu>
        <S.AsideMenuTitle>미세먼지 검색</S.AsideMenuTitle>
        <S.AsideMenuSubtitle onClick={handleNavigateToSearch}>
          미세먼지 first
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
