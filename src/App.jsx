import React from 'react';
import * as S from './App.style';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import Second from './pages/Second/Second';

const SidebarLayout = () => {
  return (
    <S.Wrapper>
      <Sidebar />
      <Outlet />
    </S.Wrapper>
  );
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      { path: '/', element: <Home />, children: [{ path: '/', element: <Second /> }] },
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
