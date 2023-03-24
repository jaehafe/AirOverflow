import React, { useEffect, useState } from 'react';
import * as S from './DisplayDataOnMap.style';
import { useGetStationNameQuery } from '../../redux/features/airPollution';

const { kakao } = window;

function DisplayDataOnMap({ APData, stationData, stationFetching, stationErr }) {
  // const {
  //   data: stationData,
  //   error: stationErr,
  //   isFetching: stationFetching,
  //   isLoading: stationLoading,
  // } = useGetStationNameQuery({ addr: '서울' });
  // , stationName: '종로구'
  const [mapInstance, setMapInstance] = useState(null);

  // const {
  //   response: {
  //     body: { items },
  //   },
  // } = stationData;
  const stationDataItems = stationData?.response?.body?.items;
  const APitems = APData?.response?.body?.items;
  // console.log('items', items);

  useEffect(() => {
    mapscript();
  }, []);

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
      center: new kakao.maps.LatLng(stationDataItems[0].dmX, stationDataItems[0].dmY),
      level: 8,
    };

    //map
    const map = new kakao.maps.Map(container, options);
    setMapInstance(map);

    stationDataItems.forEach((station) => {
      var content =
        '<div class="overlaybox">' +
        `    <div class="boxtitle">${station.stationName}</div>` +
        '    <div class="first">' +
        '        <div class="triangle text">1</div>' +
        '    </div>' +
        '</div>';

      const customOverlay = new kakao.maps.CustomOverlay({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(station.dmX, station.dmY),
        content: content,
        // image: markerImage,
        xAnchor: 0.3,
        yAnchor: 0.91,
      });

      customOverlay.setMap(map);
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
    // setIsLoading(true);
    try {
      const position = await getCurrentPositionAsync();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const locPosition = new kakao.maps.LatLng(lat, lon);
      const message = '<div class="info-title">여기에 계신가요?!</div>';

      displayMarker(locPosition, message);
    } catch (err) {
      console.log(err);
    } finally {
      // setIsLoading(false);
    }
  };

  // if (stationFetching) {
  //   return <div>isFetching ...</div>;
  // }

  // if (stationErr) {
  //   return <div>{stationErr.message}</div>;
  // }

  return (
    <div>
      <S.MapContainer id="map"></S.MapContainer>
      <S.CurrentLocationButton onClick={getCurrentLocation}>
        <S.StyledBiCurrentLocation />
      </S.CurrentLocationButton>
    </div>
  );
}

export default DisplayDataOnMap;
