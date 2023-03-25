import React from 'react';
import * as S from './LoginModal.style';
import ReactDOM from 'react-dom';
const REDIRECT_URI = 'http://localhost:5173/third';

function LoginModal({ isOpenLoginModal, setIsOpenLoginModal }) {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

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
          <S.KakaoLogo src="../../../public/kakao-button.svg" onClick={handleLogin} />
        </S.ButtonWrapper>
      </S.Container>
    </>,
    document.getElementById('overlay-root')
  );
}

export default LoginModal;
