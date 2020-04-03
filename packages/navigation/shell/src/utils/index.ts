import { css } from 'styled-components';

export const mobileOnlyScrollable = (scrollable: boolean | 'mobileOnly') => {
  if (scrollable === 'mobileOnly') {
    return css`
      @media (max-width: 991px) {
        scroll-behavior: smooth;
        overflow-y: auto;
        overflow-x: hidden;
        /* https://github.com/KingSora/OverlayScrollbars/issues/199 */
        /* overscroll-behavior-y: contain; */
      }
    `;
  }
  if (scrollable) {
    return css`
      scroll-behavior: smooth;
      overflow-x: hidden;
      overflow-y: auto;
      /* https://github.com/KingSora/OverlayScrollbars/issues/199 */
      /* overscroll-behavior-y: contain; */
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
      /* -webkit-overflow-scrolling: touch; */
      height: auto;
      scroll-behavior: smooth;
      overflow-y: auto;
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
    /* -webkit-overflow-scrolling: touch; */
    height: auto;
    scroll-behavior: smooth;
    overflow-y: auto;
    overscroll-behavior-y: contain;
  `;
};
