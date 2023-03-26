import styled from 'styled-components';

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
    /* position: relative; */
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

    /* --secondary-red: #e75b3f;
    --secondary-yellow: #f5b853;
    --secondary-cyan: #4eaaba; */

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
