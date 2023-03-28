import styled, { keyframes } from 'styled-components';

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
  position: relative;
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
export const balloon = keyframes`
  0% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(-10px) 
  }
  30% {
    transform: translateY(5px) 
  }
  50% {
    transform: translateY(-5px) 
  }
  100% {
    transform: translateY(0) 
  }
`;

export const StyledBalloon = styled.div`
  z-index: 3;
  position: absolute;
  padding: 2px 6px;
  right: -10px;
  color: #fff;
  background-color: ${(props) => props.bgColor};
  border-radius: 20px;
  animation: ${balloon} 3000ms infinite;
  font-size: 10px;

  &:after {
    z-index: 3;
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 12px solid transparent;
    /* border-top-color: var(--main-color); */
    border-bottom: 0;
    border-right: 0;
    margin-left: -5px;
    margin-bottom: -8px;
  }
`;

// export const SearchBalloon = styled(StyledBalloon)`
//   background-color: var(--primary);
// `;
// export const StarredBalloon = styled(SearchBalloon)`
//   background-color: var(--secondary-yellow);
// `;
// export const ChartBalloon = styled(SearchBalloon)`
//   background-color: var(--category-pink);
// `;
