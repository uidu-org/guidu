import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { GlobalStyles as BaseStyles } from 'twin.macro';

const CustomStyles = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    overscroll-behavior: none;
    overflow: hidden;
  }

  #root {
    height: 100%;
  }

  .os-host {
    flex: 1 1 auto;
    display: flex;
  }


  html {
    font-size: 14px;
  }

  #app {
    position: relative;
    width: 100%;
    height: 100%;
  }

  :root {
    --body-bg: #fff;
    --body-color: #000000;
    --light: #ececec;
    --primary: #1DD189;
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
