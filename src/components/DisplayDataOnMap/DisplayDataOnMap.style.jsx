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

  .overlaybox {
    position: relative;

    width: 80px;
    height: 80px;
    padding: 15px 10px;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.8;
  }
  .overlaybox div,
  ul {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  .overlaybox li {
    list-style: none;
  }
  .overlaybox .boxtitle {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--primary);
    font-size: 16px;
    font-weight: bold;

    margin-bottom: 8px;
  }
  .overlaybox .first {
    position: relative;
    width: 247px;
    height: 136px;

    margin-bottom: 8px;
  }
  .first .text {
    color: #fff;
    font-weight: bold;
  }
  .first .triangle {
    position: absolute;
    width: 48px;
    height: 48px;
    top: 0;
    left: 0;

    padding: 6px;
    font-size: 18px;
  }
  .first .movietitle {
    position: absolute;
    width: 100%;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    padding: 7px 15px;
    font-size: 14px;
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
