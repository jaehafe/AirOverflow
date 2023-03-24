import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/all';

export const Container = styled.aside`
  position: fixed;

  width: 230px;
  border: 1px solid;
  min-height: 100vh;
  overflow-y: auto;

  background-color: var(--off-white);
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
export const AsideMember = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 30px;
  background-color: var(--background-color);
  cursor: pointer;
`;
export const AsideMenu = styled.div`
  padding: 15px 30px;
  border-bottom: 1px solid var(--division);
`;
export const AsideMenuTitle = styled.h1`
  padding: 7px 20px;
  font-size: 14px;
  color: var(--aside-menu-title);
`;
export const AsideMenuSubtitle = styled.h2`
  display: flex;
  align-items: center;
  padding: 7px 20px;
  color: #38383a;
  font-size: 16px;
  cursor: pointer;

  &:hover,
  &:active {
    color: var(--primary);
  }
`;
export const StyledAiOutlineHome = styled(AiOutlineHome)`
  margin-left: 6px;
`;
// export const  Container = styled.div``
