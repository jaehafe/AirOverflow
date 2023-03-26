import React, { useEffect, useState } from 'react';
import * as S from './DisplayStarredOnMap.style';
import { colorByPM10Value } from '../../utils/mapUtils';
import { useAsyncToast, ToastContainer } from '../../hooks/useToast';

const { kakao } = window;

function DisplayStarredOnMap({ loggedInUserValues }) {
  useEffect(() => {
    mapscript();
  }, [loggedInUserValues]);

  // 맵 그려주는 함수
  const mapscript = () => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(
        loggedInUserValues[0]?.dmX,
        loggedInUserValues[0]?.dmY
      ),
      level: 8,
    };

    //map
    const map = new kakao.maps.Map(container, options);

    loggedInUserValues?.forEach((data) => {
      const content = document.createElement('div');
      content.className = 'overlaybox';
      content.style.backgroundColor = colorByPM10Value(data.pm10Value).color;
      content.innerHTML = `
        <div class="boxtitle">${data.stationName}</div>
        <div class="boxsubtitle">${data.pm10Value}</div>
        <div class="boxsubtitle">${colorByPM10Value(data.pm10Value).label}</div>
      `;

      content.addEventListener('click', () => handleAddStar(data));

      const customOverlay = new kakao.maps.CustomOverlay({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(data.dmX, data.dmY),
        content: content,
        // image: markerImage,
        xAnchor: 0.3,
        yAnchor: 0.91,
      });

      customOverlay.setMap(map);

      kakao.maps.event.addListener(customOverlay, 'click', () => {
        console.log('123');
        // 마커 위에 인포윈도우를 표시합니다
      });
    });
  };

  return (
    <>
      <ToastContainer />
      <S.MapContainer id="map"></S.MapContainer>
    </>
  );
}

export default DisplayStarredOnMap;
