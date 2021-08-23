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
    background-color: rgb(var(--body-primary-bg));
    color: rgb(var(--body-primary-color));
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
    --brand-primary: 12, 45, 124;
    --brand-secondary: 240, 240, 240;
    --brand-subtle: 240, 240, 240;

    --brand-on-primary: 255, 255, 255;
    --brand-on-secondary: 10, 10, 10;
    --brand-on-subtle: 10, 10, 10;

    --body-primary-bg: 255, 255, 255;
    --body-secondary-bg: 249, 250, 251;
    --body-primary-color: 10, 10, 10;
    --body-secondary-color: black;
    --body-on-primary-bg: 255, 254, 253;
    --body-on-primary-hover-bg: 245, 244, 243;
    --body-on-secondary-bg: 220, 220, 220;

    --border: 211, 211, 211;
    --border-strong: black;
    --tw-ring-color: rgba(var(--brand-primary), 0.5);
  }


`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
