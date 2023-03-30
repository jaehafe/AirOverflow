import React, { useEffect, useState } from 'react';
import * as S from './DisplayDataOnMap.style';
import { colorByPM10Value } from '../../utils/mapUtils';
import { useAsyncToast, ToastContainer } from '../../hooks/useToast';
import { useCookies } from 'react-cookie';
import { message } from 'antd';

const { kakao } = window;

function DisplayDataOnMap({
  APData,
  stationData,
  addStar,
  refetchStarred,
  filteredStationName,
}) {
  const [cookies] = useCookies(['airoverflow']);
  const { asyncToast } = useAsyncToast();
  const [mapInstance, setMapInstance] = useState(null);
  const userId = cookies?.airoverflow?.userId;

  const handleAddStar = (data) => {
    const access_token = cookies?.airoverflow?.access_token;

    if (!access_token) {
      message.info('즐겨찾기 추가 기능은 로그인 후 이용이 가능합니다.');
      return;
    }

    const checkStationName = filteredStationName.find(
      (station) => station === data.stationName
    );
    if (checkStationName) {
      message.info(`'${data.stationName}'은/는 이미 즐겨찾기에 저장하였습니다.`);
      return;
    }

    const messages = {
      loading: '저장중...',
      success: (data) => `${data.stationName} 즐겨찾기 저장 완료`,
      error: () => `즐겨찾기를 실패했어요.`,
    };

    const resultPromise = addStar({ data, userId })
      .unwrap()
      .then(() => refetchStarred());
    asyncToast(resultPromise, data, messages);
  };

  const stationDataItems = stationData?.response?.body?.items;
  const APDataItems = APData?.response?.body?.items;

  // /////////////////////////////////////////
  function mergeData(stationDataItems, APDataItems) {
    const mergedData = stationDataItems?.reduce((acc, stationItem) => {
      const foundAPitem = APDataItems?.find(
        (APitem) => APitem.stationName === stationItem.stationName
      );
      // console.log('foundAPitem', foundAPitem);
      // console.log('stationItem', stationItem);
      if (foundAPitem) {
        acc.push({
          sidoName: foundAPitem.sidoName,
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
  // console.log('APDataItems', APDataItems);

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
    const messages = {
      loading: '현재 위치 가져오는 중...',
      success: () => '현재 위치를 성공적으로 가져왔습니다!',
      error: () => `현재 위치 가져오기 실패.`,
    };

    const wrappedGetCurrentPositionAsync = async () => {
      try {
        const position = await getCurrentPositionAsync();
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const locPosition = new kakao.maps.LatLng(lat, lon);
        const message = '<div class="info-title">여기에 계신가요?!</div>';

        displayMarker(locPosition, message);
      } catch (err) {
        console.log(err);
        throw err;
      }
    };

    asyncToast(wrappedGetCurrentPositionAsync(), null, messages);
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
