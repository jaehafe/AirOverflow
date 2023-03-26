export const getSidoName = [
  '전국',
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
  '세종',
];

export const colorByPM10Value = (value) => {
  if (value <= 30) {
    return { label: '좋음', color: '#32a852' };
  } else if (31 <= value && value <= 80) {
    return { label: '보통', color: '#f5b853' };
  } else if (81 <= value && value <= 150) {
    return { label: '나쁨', color: '#e75b3f' };
  } else {
    return { label: '매우 나쁨', color: '#c0392b' };
  }
};

export const getCurrentPositionAsync = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error)
    );
  });
};
