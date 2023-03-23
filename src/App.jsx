import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import InitPage from './pages/InitPage/InitPage';

const router = createBrowserRouter([{ path: '/', element: <InitPage /> }]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
