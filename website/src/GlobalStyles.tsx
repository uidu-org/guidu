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

  *, ::before, ::after {
  --tw-border-opacity: 1;
  border-color: rgba(var(--border), var(--tw-border-opacity));
  }

  :root {
    --brand-primary: 19, 152, 170;
    --brand-on-primary: 255, 255, 254;

    --brand-secondary: 240, 240, 240;
    --brand-on-secondary: 10, 10, 10;

    --brand-subtle: 240, 240, 240;
    --brand-on-subtle: 10, 10, 10;

    --brand-warning: 245, 158, 11;
    --brand-on-warning: 245, 245, 245;

    --brand-danger: 239, 68, 68;
    --brand-on-danger: 245, 245, 245;

    --body-primary-bg: 253, 254, 255;
    --body-secondary-bg: 253, 254, 255;
    // --body-secondary-bg: 250, 251, 251; // 253, 253, 254;

    --body-primary-color: 9, 14, 26;
    --body-secondary-color: 9, 14, 26;

    --body-on-primary-bg: 253, 253, 254;
    --body-on-primary-hover-bg: 245, 244, 243;

    --body-on-secondary-bg: 233, 236, 240;
    --body-on-secondary-hover-bg: 245, 244, 243;

    --border: 234, 237, 245;
    --field-border: 198, 203, 216;
    --checkbox-border: 198, 203, 216;
    --radio-border: 198, 203, 216;
    --border-strong: 0, 0, 0;

    --brand-danger: 239, 68, 68;
    --brand-warning: 251, 191, 36;
    --brand-success: 251, 191, 36;

    /* --brand-on-danger: 239, 68, 68; */
    /* --brand-on-warning: 251, 191, 36; */
    /* --brand-on-success: 251, 191, 36; */
    --tw-ring-color: rgba(var(--brand-primary), 0.5);
  }

  .dark {
    --brand-primary: 12, 45, 124;
    --brand-secondary: 240, 240, 240;
    --brand-subtle: 40, 40, 50;

    --brand-danger: 239, 68, 68;
    --brand-warning: 251, 191, 36;
    --brand-success: 251, 191, 36;

    /* --brand-on-danger: 239, 68, 68; */
    /* --brand-on-warning: 251, 191, 36; */
    /* --brand-on-success: 251, 191, 36; */

    --brand-on-primary: 255, 255, 255;
    --brand-on-secondary: 10, 10, 10;
    --brand-on-subtle: 240, 240, 240;

    --body-primary-bg: 10, 10, 10;
    --body-secondary-bg: 20, 20, 20;
    --body-primary-color: 255, 255, 255;
    --body-secondary-color: black;
    --body-on-primary-bg: 16, 15, 17;
    --body-on-primary-hover-bg: 50, 50, 50;
    --body-on-secondary-bg: 220, 220, 220;

    --border: 50, 50, 50;
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
