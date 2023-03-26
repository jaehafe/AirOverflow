import React, { useState } from 'react';
import * as S from './App.style';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import Starred from './pages/Starred/Starred';
import Search from './pages/Search/Search';
import KakaoLoginCallback from './pages/KakaoLoginCallback/KakaoLoginCallback';

const SidebarLayout = () => {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  return (
    <S.Wrapper>
      <Sidebar
        isOpenLoginModal={isOpenLoginModal}
        setIsOpenLoginModal={setIsOpenLoginModal}
      />
      <Outlet />
    </S.Wrapper>
  );
};
const HomeLayout = () => {
  return (
    <Home>
      <Outlet />
    </Home>
  );
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <HomeLayout />,
        children: [
          { path: '/search', element: <Search /> },
          { path: '/starred', element: <Starred /> },
          { path: '/KakaoLoginCallback', element: <KakaoLoginCallback /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <S.Container>
      <RouterProvider router={router} />
    </S.Container>
  );
}

export default App;
