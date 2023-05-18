## 1. 프로젝트 주제

- 지도 기반 미세먼지 확인 앱
- 3/24~ 3/31 (1주)
- 개인 진행
- Github Repo
    - [https://github.com/jaehafe/AirOverflow](https://github.com/jaehafe/AirOverflow)
- 배포 주소
    - [https://air-overflow.vercel.app](https://air-overflow.vercel.app/)

### 2. 기술 스택

- client
    - React
    - 비동기 관리: RTK Query
    - 상태 관리: Redux Toolkit
    - 라우터: React Router v6.4
    - css: Styled-Components
    - UI: antd
- backend
    - DB: Firebase
    - 공공 미세먼지 api
- 기타
    - kakao auth
    - kakao map
    - react-chartjs-2
    - react-hot-toast

### 3. pages, components flow chart
![air overflow](https://github.com/jaehafe/AirOverflow/assets/108874515/24baba86-c206-45d8-8395-d843b26a5772)


### 4. 주요 기능 구현

- RTK와 RTK Query로 전역 상태관리 및 비동기 관리
- Firabse 사용
    - 개별로 주어진 api(1. dmX, dmY, 2. 미세먼지 농도) 두 개의 api를 가공해서 지도상에 렌더링
    - 즐겨찾기 시 firebase에 비동기 요청
- kakao map
    - 지도상에 시/도, 지역별 미세먼지 정보 렌더링, 현재위치 확인
- kakao auth
    - 카카오톡 로그인 후 받은 token을 cookie에 저장한 후 즐겨찾기 구현
- chartjs
    - 개별로 주어진 api(시/도 지역 이름)를 전역 상태관리에 저장해서 이중 필터링 한 데이터를 chart로 보여주기
- react hot toast
    - 비동기 알림을 컴포넌트로 만들어서 재사용성 고려

### 문제 해결 및 프로젝트 회고
https://adam-37.gitbook.io/joomadeung/undefined-3/undefined/undefined
