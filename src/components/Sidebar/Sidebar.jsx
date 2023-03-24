import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './Sidebar.style';

function index() {
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
      <S.AsideMenu>
        <S.AsideMenuTitle>커리어 카드</S.AsideMenuTitle>
        <S.AsideMenuSubtitle>나의 커리어 카드</S.AsideMenuSubtitle>
        <S.AsideMenuSubtitle>
          IT 스킬 체크업
          <S.StyledAiOutlineHome />
        </S.AsideMenuSubtitle>
      </S.AsideMenu>
    </S.Container>
  );
}

export default index;
