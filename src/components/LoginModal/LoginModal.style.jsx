import styled from 'styled-components';
import { GrClose } from 'react-icons/all';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Container = styled.div`
  z-index: 3;
  position: fixed;

  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  padding: 30px;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const StyledCloseIcon = styled(GrClose)`
  cursor: pointer;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 30px;
`;
export const Logo = styled.img`
  width: 100px;
`;

export const LogoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: var(--primary);

  & h3 {
    font-size: 28px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const KakaoLogo = styled.img`
  cursor: pointer;
`;
export const Message = styled.h4`
  display: flex;
  justify-content: center;
`;
// export const Container = styled.div``
// export const Container = styled.div``
