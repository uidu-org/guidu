import { css } from 'styled-components';

export const mobileOnlyScrollable = (scrollable: boolean | 'mobileOnly') => {
  if (scrollable === 'mobileOnly') {
    return css`
      @media (max-width: 991px) {
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
        overflow-y: scroll;
        overscroll-behavior-y: contain;
      }
    `;
  }
  if (scrollable) {
    return css`
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      overflow-y: scroll;
      overscroll-behavior-y: contain;
    `;
  }
  return css``;
};

export const mobileOnlyHeight = (fixedHeight: boolean | 'mobileOnly') => {
  if (fixedHeight === 'mobileOnly') {
    return css`
      @media (max-width: 991px) {
        height: 100%;
      }
      -webkit-overflow-scrolling: touch;
      height: auto;
      scroll-behavior: smooth;
      overflow-y: scroll;
      overscroll-behavior-y: contain;
    `;
  }
  if (fixedHeight) {
    return css`
      overflow: hidden;
      height: 100%;
    `;
  }
  return css`
    -webkit-overflow-scrolling: touch;
    height: auto;
    scroll-behavior: smooth;
    overflow-y: scroll;
    overscroll-behavior-y: contain;
  `;
};
