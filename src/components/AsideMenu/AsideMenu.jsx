import React from 'react';
import * as S from './AsideMenu.style';

const AsideMenu = ({ title, subTitle, balloon, navigate }) => {
  let color = 'var(--secondary-yellow)';

  if (balloon === '검색하기') {
    color = 'var(--primary)';
  } else if (balloon === '회원전용') {
    color = 'var(--secondary-yellow)';
  } else if (balloon === '현황차트') {
    color = 'var(--category-pink)';
  }

  return (
    <S.AsideMenu>
      <S.AsideMenuTitle>{title}</S.AsideMenuTitle>
      <S.AsideMenuSubtitle onClick={() => navigate()}>
        {subTitle}
        <S.StyledBalloon bgColor={color}>{balloon}</S.StyledBalloon>
      </S.AsideMenuSubtitle>
    </S.AsideMenu>
  );
};

export default AsideMenu;
