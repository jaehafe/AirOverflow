import React from 'react';
import ReactDOM from 'react-dom/client';
import ResetCss from './style/ResetCss';
import { GlobalStyles } from './style/GlobalStyle';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ResetCss />
      <GlobalStyles />
      <App />
    </Provider>
  </React.StrictMode>
);
