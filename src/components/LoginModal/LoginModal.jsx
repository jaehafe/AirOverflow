import React from 'react';
import * as S from './LoginModal.style';
import ReactDOM from 'react-dom';

function LoginModal({ isOpenLoginModal, setIsOpenLoginModal }) {
  return ReactDOM.createPortal(
    <>
      <S.Backdrop onClick={() => setIsOpenLoginModal(false)} />
      <S.Container>
        <S.ModalHeader>
          <S.StyledCloseIcon onClick={() => setIsOpenLoginModal(false)} />
        </S.ModalHeader>

        <S.LogoWrapper>
          <S.Logo src="../../../public/logo.svg" />
          <S.LogoTextWrapper>
            <h3>Air </h3>
            <h3>Overflow</h3>
          </S.LogoTextWrapper>
        </S.LogoWrapper>
        <S.Message>로그인하고 장소를 저장해 보세요!</S.Message>
        {/* 카카오 버튼 */}
        <S.ButtonWrapper>
          <S.KakaoLogo src="../../../public/kakao-button.svg" />
        </S.ButtonWrapper>
      </S.Container>
    </>,
    document.getElementById('overlay-root')
  );
}

export default LoginModal;
