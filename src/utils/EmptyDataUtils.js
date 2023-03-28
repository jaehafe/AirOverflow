import empty from '../assets/empty.json';
import notFoundLottie from '../assets/notFound.json';

export const EmptyStarredProps = {
  title: '즐겨찾기 데이터가 없네요.',
  navigate: '/',
  aniName: empty,
  navigateBtnTitle: '추가하러 가기',
};

export const EmptyChartDataProps = {
  title: '표시할 차트가 없네요. \n 지역을 선택해보세요.',
  aniName: empty,
};

export const NotFoundProps = {
  title: '알 수 없는 오류가 발생했습니다.',
  navigate: '/',
  aniName: notFoundLottie,
  navigateBtnTitle: '홈으로 돌아가기',
};
