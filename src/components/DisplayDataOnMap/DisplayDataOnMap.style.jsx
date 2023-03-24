import styled from 'styled-components';
import { BiCurrentLocation } from 'react-icons/all';

export const StyledBiCurrentLocation = styled(BiCurrentLocation)`
  font-size: 24px;
  color: #333;
`;

export const MapContainer = styled.div`
  width: 100vh;
  min-height: 100vh;

  .info-title {
    padding: 100px;
    /* width: 100px;
    height: 100px; */
    display: block;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    background: #50627f;
    color: #fff;
    text-align: center;
    height: 24px;
    line-height: 22px;
    border-radius: 4px;
    padding: 0px 10px;
  }
`;

export const CurrentLocationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  z-index: 14;
  background-color: #fff;

  bottom: 20px;
  right: 20px;

  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: var(--box-shadow);

  &:hover,
  &:active {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.7);
  }
`;

// 인포윈도우
export const StyledInfo = styled.span`
  width: 100px;
  height: 100px;
  padding: 5px;
  background-color: #50627f;
  color: #fff;
  text-align: center;
  height: 24px;
  line-height: 22px;
  border-radius: 4px;
  padding: 0px 10px;
`;
