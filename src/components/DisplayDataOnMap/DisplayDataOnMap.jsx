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
  console.log('mergedData', mergedData);

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

    const colorByPM10Value = (value) => {
      if (value <= 30) {
        return { label: '좋음', color: '#32a852' }; // 색상을 원하는 값으로 변경하세요.
      } else if (31 <= value && value <= 80) {
        return { label: '보통', color: '#f5b853' };
      } else if (81 <= value && value <= 150) {
        return { label: '나쁨', color: '#e75b3f' };
      } else {
        return { label: '매우 나쁨', color: '#c0392b' };
      }
    };

    mergedData?.forEach((data) => {
      const content = `
        <div class="overlaybox" style="background-color:${
          colorByPM10Value(data.pm10Value).color
        }">
          <div class="boxtitle">${data.stationName}</div>
          <div class="boxsubtitle">${data.pm10Value}</div>
          <div class="boxsubtitle">${colorByPM10Value(data.pm10Value).label}</div>
        </div>
      `;

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
