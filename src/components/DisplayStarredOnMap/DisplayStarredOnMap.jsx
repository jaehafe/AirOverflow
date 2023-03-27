import React, { useEffect, useState } from 'react';
import * as S from './DisplayStarredOnMap.style';
import { colorByPM10Value } from '../../utils/mapUtils';
import { useAsyncToast, ToastContainer } from '../../hooks/useToast';
import { useDeleteStarMutation } from '../../redux/features/starred';
import EmptyData from '../EmptyData/EmptyData';
import { setSidoName } from '../../redux/features/sidoSlice';
import { useSelector, useDispatch } from 'react-redux';

const { kakao } = window;

function DisplayStarredOnMap({
  starredSidoName,
  APData,
  loggedInUserData,
  allStarredDataArr,
}) {
  const dispatch = useDispatch();
  const { activeSido } = useSelector((state) => state.sido);
  const [deleteStar] = useDeleteStarMutation();
  const { asyncToast } = useAsyncToast();

  ///////////////
  const data = [];
  console.log('starredSidoName', starredSidoName);
  useEffect(() => {
    dispatch(
      setSidoName({
        ...activeSido,
        sidoName: starredSidoName[0]?.sidoName, // 인천
      })
    );
    console.log('activeSido!!!!!!!!!', activeSido);
    // console.log('starredSidoName[0]?.sidoName', starredSidoName[0]?.sidoName);
    // console.log('starredSidoName[0]?.stationName', starredSidoName[0]?.stationName);
    const APDataItems = APData?.response?.body?.items;
    console.log('APData', APDataItems);
    const filtered = APDataItems?.find(
      (data) => data.stationName === starredSidoName[0]?.stationName
    );
    console.log('filtered', filtered);
    data.push(filtered);
    console.log(data);
  }, [activeSido, starredSidoName]);

  //////////////

  useEffect(() => {
    if (loggedInUserData.length > 0) {
      mapscript();
    }
  }, [loggedInUserData]);

  // const stationNameArr = loggedInUserData.map((data) => data.value.data.stationName);
  // console.log('stationNameArr', stationNameArr);

  const handleDeleteStar = (target) => {
    console.log('target', target);

    const messages = {
      loading: '삭제중...',
      success: (target) => `${target.value.data.stationName} 즐겨찾기 삭제 완료`,
      error: () => `즐겨찾기 삭제를 실패했어요.`,
    };
    try {
      const resultPromise = deleteStar(target.id).unwrap();
      asyncToast(resultPromise, target, messages);
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
    <>
      {/* <button onClick={handleClick}>click!</button> */}
      <ToastContainer />
      {/* <S.MapContainer id="map" /> */}
      {loggedInUserData.length > 0 ? <S.MapContainer id="map" /> : <EmptyData />}
    </>
  );
}

export default DisplayStarredOnMap;
