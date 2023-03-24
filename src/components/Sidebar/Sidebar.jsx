import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as S from './Sidebar.style';

function Sidebar() {
  const navigate = useNavigate();
  const handleNavigateToSearch = () => {
    navigate('/first');
  };
  return (
    <S.Container>
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
      <S.AsideMember>로그인 하기</S.AsideMember>
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
        <S.AsideMenuTitle>미세먼지 검색2</S.AsideMenuTitle>
        <S.AsideMenuSubtitle onClick={() => navigate('/second')}>
          미세먼지 sec
        </S.AsideMenuSubtitle>
        {/* <S.AsideMenuSubtitle>
          IT 스킬 체크업
          <S.StyledAiOutlineHome />
        </S.AsideMenuSubtitle> */}
      </S.AsideMenu>
      <S.AsideMenu>
        <S.AsideMenuTitle>미세먼지 검색3</S.AsideMenuTitle>
        <S.AsideMenuSubtitle onClick={() => navigate('/third')}>
          미세먼지 trd
        </S.AsideMenuSubtitle>
        {/* <S.AsideMenuSubtitle>
          IT 스킬 체크업
          <S.StyledAiOutlineHome />
        </S.AsideMenuSubtitle> */}
      </S.AsideMenu>
    </S.Container>
  );
}

export default Sidebar;
