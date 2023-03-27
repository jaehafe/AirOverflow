import styled from 'styled-components';

export const MapContainer = styled.div`
  width: 970px;
  min-height: 100vh;

  .info-title {
    padding: 100px;
    display: block;
    background: #50627f;
    color: #fff;
    text-align: center;
    height: 24px;
    line-height: 22px;
    border-radius: 4px;
    padding: 0px 10px;
  }

  .overlaybox {
    width: 80px;
    height: 80px;
    padding: 15px 10px;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .boxtitle {
      color: var(--primary);
      font-size: 16px;
      font-weight: bold;

      margin-bottom: 8px;
    }

    & .boxsubtitle {
      color: #fff;
    }
  }
`;
