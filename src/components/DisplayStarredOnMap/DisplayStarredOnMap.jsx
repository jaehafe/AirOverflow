import React, { useEffect, useState } from 'react';
import * as S from './DisplayStarredOnMap.style';
import { colorByPM10Value } from '../../utils/mapUtils';
import { useAsyncToast, ToastContainer } from '../../hooks/useToast';
import { useDeleteStarMutation } from '../../redux/features/starred';
import EmptyData from '../EmptyData/EmptyData';
import { EmptyStarredProps } from '../../utils/EmptyDataUtils';

const { kakao } = window;

function DisplayStarredOnMap({ loggedInUserData: initialData }) {
  const [loggedInUserData, setLoggedInUserData] = useState(initialData);
  const [deleteStar] = useDeleteStarMutation({ refetchOnMountOrArgChange: true });
  const { asyncToast } = useAsyncToast();

  useEffect(() => {
    if (loggedInUserData.length > 0) {
      mapscript();
    }
  }, [loggedInUserData]);

  const handleDeleteStar = (target) => {
    console.log('target', target);

    const messages = {
      loading: '삭제중...',
      success: (target) => `${target.value.data.stationName} 즐겨찾기 삭제 완료`,
      error: () => `즐겨찾기 삭제를 실패했어요.`,
    };
    try {
      // loggedInUserData.filter((data) => data.id !== target.id);
      const resultPromise = deleteStar(target.id).unwrap();
      asyncToast(resultPromise, target, messages);
      setLoggedInUserData(loggedInUserData.filter((data) => data.id !== target.id));
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
        loggedInUserData[0]?.value.data.dmX,
        loggedInUserData[0]?.value.data.dmY
      ),
      level: 8,
    };

    //map
    const map = new kakao.maps.Map(container, options);

    loggedInUserData?.forEach((data) => {
      const content = document.createElement('div');
      content.className = 'overlaybox';
      content.style.backgroundColor = colorByPM10Value(data.value.data.pm10Value).color;
      content.innerHTML = `
        <div class="boxtitle">${data.value.data.stationName}</div>
        <div class="boxsubtitle">${data.value.data.pm10Value}</div>
        <div class="boxsubtitle">${
          colorByPM10Value(data.value.data.pm10Value).label
        }</div>
      `;

      content.addEventListener('click', () => handleDeleteStar(data));

      const customOverlay = new kakao.maps.CustomOverlay({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(data.value.data.dmX, data.value.data.dmY),
        content: content,
        // image: markerImage,
        xAnchor: 0.3,
        yAnchor: 0.91,
      });

      customOverlay.setMap(map);
    });
  };

  return (
    <div>
      <ToastContainer />
      {loggedInUserData.length > 0 ? (
        <S.MapContainer id="map" />
      ) : (
        <EmptyData props={EmptyStarredProps} />
      )}
    </div>
  );
}

export default DisplayStarredOnMap;
