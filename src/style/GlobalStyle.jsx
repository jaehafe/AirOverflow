import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'GmarketSans';
    src: url('../../public/fonts/GmarketSansTTFBold.ttf');
    /* font-weight: 500; */
    font-style: normal;
  }

  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('../../public/fonts/GmarketSansTTFMedium.ttf');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'GmarketSansLight';
    src: url('../../public/fonts/GmarketSansTTFLight.ttf');
    font-weight: normal;
    font-style: normal;
  }

  body {
    border: 1px solid;
    width: 390px;
    margin: auto;
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }


  * {
  /* font: inherit; */
  font-family: "GmarketSansLight", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  --main-color: #F965A3;
  --box-shadow: 0 0 0 1px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 5%),
    0 12px 24px rgb(0 0 0 / 5%);
  --division: rgb(239, 224, 224);
  --subtitle-color: rgb(174, 153, 153);
  --button-color: rgba(233, 173, 182, 0.8);
  --background-color: #FAE3EB;
  }
  
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  li {
    list-style: none;
  }

  a,
  img,
  span,
  input,
  button,
  ion-icon {
    display: block;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  input,
  button {
    background: none;
    border: none;
    font: inherit;
  }

  input {
    width: 100%;
  }

  button {
    cursor: pointer;
  }

  iframe {
    border: 0;
  }

  & h1 {
    font-size: 32px;
    font-family: 'GmarketSansMedium', sans-serif;
    line-height: 32px;
  }
  & h2 {
    font-size: 24px;
    font-family: 'GmarketSansMedium', sans-serif;
    line-height: 22px;
  }
  & h3 {
    font-size: 18px;
    font-family: 'GmarketSansMedium', sans-serif;
    line-height: 24px;
  }
  & h4 {
    font-size: 16px;
    font-family: 'GmarketSansMedium', sans-serif;
    line-height: 24px;
  }
  & h5 {
    font-size: 14px;
    font-family: 'GmarketSansMedium', sans-serif;
    line-height: 24px;
  }
  & h6 {
    font-size: 10px;
    font-family: 'GmarketSansMedium', sans-serif;
    line-height: 24px;
  }
  & p {
    font-size: 14px;
    font-family: 'GmarketSansMedium', sans-serif;
    line-height: 20px;
  }

  & div {
    font-size: 16px;
    font-family: 'GmarketSansMedium', sans-serif;
    line-height: 20px;
  }

  & span {
    font-size: 16px;
    font-family: 'GmarketSansMedium', sans-serif;
    line-height: 20px;
  }
`;
