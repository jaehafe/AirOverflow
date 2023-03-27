import React from 'react';
import * as S from './EmptyData.style';
import emptyCart from '../../assets/empty.json';
import LottieAni from '../lottieAni';
import { Link } from 'react-router-dom';

function EmptyData() {
  return (
    <S.Container>
      <S.Title>즐겨찾기 데이터가 없네요</S.Title>
      <S.HeroIMG>
        <LottieAni aniName={emptyCart} />
      </S.HeroIMG>
      <S.Button>
        <Link to="/search">추가하러 가기</Link>
      </S.Button>
    </S.Container>
  );
}

export default EmptyData;
