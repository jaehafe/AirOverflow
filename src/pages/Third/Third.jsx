import React, { useEffect, useState } from 'react';
import * as S from './Third.style';

const { kakao } = window;
// Lat;

function Third() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    mapScript();
  }, []);
  // Lat, Lng

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

  const mapScript = () => {
    const container = document.getElementById('map');
    const options = {
      // center: new kakao.maps.LatLng(Lat, Lng),
      center: new kakao.maps.LatLng(37.5662952, 126.9779451),
      level: 5,
    };
    //map
    const map = new kakao.maps.Map(container, options);
    setMapInstance(map);

    // const imageSrc =
    //   'https://play-lh.googleusercontent.com/PmY6TGbSTUBZkEZRQp5_h2IRw87KXL9iZoQ_FiZW0ve4U5ppt2ArK0PMKMy1X3LHVA=w480-h960-rw';
    // const imageSize = new kakao.maps.Size(40, 40); // 마커이미지의 크기입니다
    // const imageOption = { offset: new kakao.maps.Point(27, 69) }; //
    // const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // 마커를 생성
    const marker = new kakao.maps.Marker({
      //마커가 표시 될 위치
      position: new kakao.maps.LatLng(37.5662952, 126.9779451),
      // image: markerImage,
    });
    // 마커에 표시할 인포윈도우를 생성
    const infowindow = new kakao.maps.InfoWindow({
      content: '123', // 인포윈도우에 표시할 내용
    });

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록
    // 이벤트 리스너로는 클로저를 만들어 등록
    // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록
    kakao.maps.event.addListener(
      marker,
      'mouseover',
      makeOverListener(map, marker, infowindow)
    );
    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수
    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }
    // 마커를 지도 위에 표시
    marker.setMap(map);
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
      const message = '<div style="padding:5px;">여기에 계신가요?!</div>';
      displayMarker(locPosition, message);
    } catch (error) {
      // setError('현재 위치를 가져오는 데 실패했습니다.');
      console.log(err);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div>
      <S.MapContainer id="map"></S.MapContainer>
      <S.CurrentLocationButton onClick={getCurrentLocation}>
        <S.StyledBiCurrentLocation />
      </S.CurrentLocationButton>
    </div>
  );
}

export default Third;
