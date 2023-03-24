import React, { useEffect, useState } from 'react';
import * as S from './First.style';

const { kakao } = window;
// Lat;

function First() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  return (
    <div>
      <S.MapContainer id="map"></S.MapContainer>
      <S.CurrentLocationButton>
        <S.StyledBiCurrentLocation />
      </S.CurrentLocationButton>
    </div>
  );
}

export default First;
