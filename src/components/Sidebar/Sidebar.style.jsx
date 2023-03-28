import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/all';

export const Container = styled.aside`
  position: fixed;

  width: 230px;

  min-height: 100vh;
  overflow-y: auto;

  background-color: #fff;
`;

export const AsideLogo = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 30px;
`;
export const Logo = styled.img`
  width: 62px;
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export const LogoTextWrapper = styled.div`
  color: var(--primary);
`;

// 로그인
export const AsideMemberWrapper = styled.div``;
export const AsideMember = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 30px;
  background-color: var(--background-color);
  cursor: pointer;
`;
export const AsideLogin = styled(AsideMember)``;
export const AsideLogout = styled(AsideMember)``;

//

export const StyledAiOutlineHome = styled(AiOutlineHome)`
  margin-left: 6px;
`;
