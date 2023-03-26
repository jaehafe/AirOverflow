import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'GmarketSans';
    src: url('/fonts/GmarketSansTTFBold.ttf');
    /* font-weight: 500; */
    font-style: normal;
  }

  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('/fonts/GmarketSansTTFMedium.ttf');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'GmarketSansLight';
    src: url('/fonts/GmarketSansTTFLight.ttf');
    font-weight: normal;
    font-style: normal;
  }

  body {
    background-color: var(--background-color);
    
    margin: auto;
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }


  * {
  /* font: inherit; */
  font-family: "GmarketSansMedium", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  
  --box-shadow: 0 0 0 1px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 5%),
    0 12px 24px rgb(0 0 0 / 5%);
  --division: rgb(239, 224, 224);
  --aside-menu-title: #acacae;
  --off-white: #f7f6f3;
  --primary: #524D90;
  --primary-alt: #A79FCB;
  --primary-alt-40: rgba(167, 159, 203, 0.4);
  --secondary-red: #E75B3F;
  --secondary-yellow: #F5B853;
  --secondary-cyan: #4EAABA;
  --category-sky: #6ED5EB;
  --category-cyan: #4CB8B8;
  --category-mint: #94D3CC;
  --category-blue: #4CA1DE;
  --category-pink: #D092E2;
  --category-purple: #817DCE;
  --category-navy: #4A6CC3;
  --category-green: #B9D58C;
  --category-yellow: #E6D267;
  --category-orange: #E2B765;

  --background-color: #E9EAED;
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
