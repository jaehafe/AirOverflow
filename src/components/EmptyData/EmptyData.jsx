import React from 'react';
import * as S from './EmptyData.style';
import empty from '../../assets/empty.json';
import LottieAni from '../lottieAni';
import { Link } from 'react-router-dom';

function EmptyData({ props }) {
  return (
    <S.Container>
      <S.Title>{props.title}</S.Title>
      <S.HeroIMG>
        <LottieAni aniName={empty} />
      </S.HeroIMG>
      {props.navigate && (
        <S.Button>
          <Link to={props.navigate}>{props.navigateBtnTitle}</Link>
        </S.Button>
      )}
    </S.Container>
  );
}

export default EmptyData;
