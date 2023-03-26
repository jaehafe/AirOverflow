import React, { useEffect, useState } from 'react';
import * as S from './DisplayDataOnMap.style';
import { colorByPM10Value } from '../../utils/mapUtils';
import { useAsyncToast, ToastContainer } from '../../hooks/useToast';

const { kakao } = window;

function DisplayDataOnMap({
  APData,
  stationData,
  stationFetching,
  stationErr,
  addStar,
  deleteStar,
}) {
  const { asyncToast } = useAsyncToast();
  const [mapInstance, setMapInstance] = useState(null);

  const handleAddStar = async (data) => {
    try {
      const resultPromise = addStar({ data }).unwrap();
      asyncToast(resultPromise, data, {
        loading: '저장중...',
        success: (data) => `${data.stationName} 즐겨찾기 저장 완료`,
        error: (err) => `즐겨찾기를 실패했어요.`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const stationDataItems = stationData?.response?.body?.items;
  const APDataItems = APData?.response?.body?.items;

  // /////////////////////////////////////////
  function mergeData(stationDataItems, APDataItems) {
    const mergedData = stationDataItems?.reduce((acc, stationItem) => {
      const foundAPitem = APDataItems?.find(
        (APitem) => APitem.stationName === stationItem.stationName
      );

      if (foundAPitem) {
        acc.push({
          stationName: stationItem.stationName,
          pm10Value: foundAPitem.pm10Value,
          dmX: stationItem.dmX,
          dmY: stationItem.dmY,
        });
      }

      return acc;
    }, []);

    return mergedData;
  }

  const mergedData = mergeData(stationDataItems, APDataItems);
  // console.log('mergedData', mergedData);

  /////////////////////////////////////////

  useEffect(() => {
    mapscript();
  }, [stationDataItems, APDataItems]);

  // marker 표시
  function displayMarker(locPosition, message) {
    if (!mapInstance) return;

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      map: mapInstance,
      position: locPosition,
    });

    const iwContent = message, // 인포윈도우에 표시할 내용
      iwRemoveable = true;

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(mapInstance, marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    mapInstance.setCenter(locPosition);
  }

  // 맵 그려주는 함수
  const mapscript = () => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(mergedData[0]?.dmX, mergedData[0]?.dmY),
      level: 8,
    };

    //map
    const map = new kakao.maps.Map(container, options);
    setMapInstance(map);

    mergedData?.forEach((data) => {
      const content = document.createElement('div');
      content.className = 'overlaybox';
      content.style.backgroundColor = colorByPM10Value(data.pm10Value).color;
      content.innerHTML = `
        <div class="boxtitle">${data.stationName}</div>
        <div class="boxsubtitle">${data.pm10Value}</div>
        <div class="boxsubtitle">${colorByPM10Value(data.pm10Value).label}</div>
      `;

      content.addEventListener('click', () => handleAddStar(data));

      // const content = `
      //   <div class="overlaybox" style="background-color:${
      //     colorByPM10Value(data.pm10Value).color
      //   }" onclick="handleAddFavorite(${data.stationName})">
      //     <div class="boxtitle">${data.stationName}</div>
      //     <div class="boxsubtitle">${data.pm10Value}</div>
      //     <div class="boxsubtitle">${colorByPM10Value(data.pm10Value).label}</div>
      //   </div>
      // `;

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

  const getCurrentPositionAsync = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  };

  const getCurrentLocation = async () => {
    try {
      const position = await getCurrentPositionAsync();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const locPosition = new kakao.maps.LatLng(lat, lon);
      const message = '<div class="info-title">여기에 계신가요?!</div>';

      displayMarker(locPosition, message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ToastContainer />
      <S.MapContainer id="map"></S.MapContainer>
      <S.CurrentLocationButton onClick={getCurrentLocation}>
        <S.StyledBiCurrentLocation />
      </S.CurrentLocationButton>
    </div>
  );
}

export default DisplayDataOnMap;
