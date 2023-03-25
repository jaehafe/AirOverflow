import React, { useState } from 'react';
import * as S from './App.style';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import Second from './pages/Second/Second';
import First from './pages/First/First';
import Third from './pages/Third/Third';
import LoginModal from './components/LoginModal/LoginModal';

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
          { path: '/first', element: <First /> },
          { path: '/second', element: <Second /> },
          { path: '/third', element: <Third /> },
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
