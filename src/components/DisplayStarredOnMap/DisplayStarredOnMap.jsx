import React, { useEffect, useState } from 'react';
import * as S from './DisplayStarredOnMap.style';
import { colorByPM10Value } from '../../utils/mapUtils';
import { useAsyncToast, ToastContainer } from '../../hooks/useToast';
import { useDeleteStarMutation } from '../../redux/features/starred';

const { kakao } = window;

function DisplayStarredOnMap({ starredData, loggedInUserValues }) {
  const [deleteStar] = useDeleteStarMutation();
  const { asyncToast } = useAsyncToast();
  useEffect(() => {
    if (loggedInUserValues) {
      mapscript();
    }
  }, [loggedInUserValues]);

  console.log('loggedInUserValues', loggedInUserValues);
  const handleDeleteStar = async (target) => {
    console.log('target', target);
    let keyToDelete = null;

    for (const key in starredData) {
      if (starredData[key]?.data?.stationName === target.stationName) {
        keyToDelete = key;
        break;
      }
    }

    const messages = {
      loading: '삭제중...',
      success: (target) => `${target.stationName} 즐겨찾기 삭제 완료`,
      error: () => `즐겨찾기 삭제를 실패했어요.`,
    };
    try {
      if (keyToDelete) {
        const resultPromise = deleteStar(keyToDelete).unwrap();
        asyncToast(resultPromise, target, messages);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

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

      content.addEventListener('click', () => handleDeleteStar(data));

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
    });
  };

  return (
    <>
      <ToastContainer />
      <S.MapContainer id="map" />
      {/* {loggedInUserValues.length > 0 ? (
        <S.MapContainer id="map"></S.MapContainer>
      ) : (
        <>'즐겨찾기 한 데이터가 없습니다.'</>
      )} */}
    </>
  );
}

export default DisplayStarredOnMap;
