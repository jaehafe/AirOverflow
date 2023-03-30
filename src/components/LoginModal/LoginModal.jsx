import React from 'react';
import * as S from './LoginModal.style';
import ReactDOM from 'react-dom';
import { message } from 'antd';

// `${import.meta.env.VITE_KAKAO_REDIRECT_URL}`
// const REDIRECT_URI = `${import.meta.env.VITE_KAKAO_REDIRECT_URL}`;

function LoginModal({ isOpenLoginModal, setIsOpenLoginModal }) {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URL}&response_type=code`;

  const handleKaokaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleGithubLogin = () => {
    message.info('서비스 준비중입니다.');
  };

  return ReactDOM.createPortal(
    <>
      <S.Backdrop onClick={() => setIsOpenLoginModal(false)} />
      <S.Container>
        <S.ModalHeader>
          <S.StyledCloseIcon onClick={() => setIsOpenLoginModal(false)} />
        </S.ModalHeader>

        <S.LogoWrapper>
          <S.Logo src="/logo.svg" />
          <S.LogoTextWrapper>
            <h3>Air </h3>
            <h3>Overflow</h3>
          </S.LogoTextWrapper>
        </S.LogoWrapper>
        <S.Message>로그인하고 장소를 저장해 보세요!</S.Message>
        {/* 카카오 버튼 */}
        <S.ButtonWrapper>
          <S.KakaoLoginButton src="/kakao-button.svg" onClick={handleKaokaoLogin} />
          <S.GithubLoginButton src="/github-button.png" onClick={handleGithubLogin} />
        </S.ButtonWrapper>
      </S.Container>
    </>,
    document.getElementById('overlay-root')
  );
}

export default LoginModal;
