import styled, { css } from 'styled-components';

const mobileOnlyHeight = (fixedHeight: boolean | 'mobileOnly') => {
  if (fixedHeight === 'mobileOnly') {
    return css`
      @media (max-width: 700px) {
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

const mobileOnlyScrollable = (scrollable: boolean | 'mobileOnly') => {
  if (scrollable === 'mobileOnly') {
    return css`
      @media (max-width: 700px) {
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

export const Wrapper = styled.div<{
  fixedHeight: boolean | 'mobileOnly';
}>`
  display: flex;
  overscroll-behavior: none;

  ${({ fixedHeight }) => mobileOnlyHeight(fixedHeight)};
  max-height: 100vh;
  width: 100vw;

  min-width: 0;
  min-height: 0;
`;

export const Sidebar = styled.aside`
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-between;
`;

export const Navigation = styled.aside`
  flex-direction: row;
  justify-content: flex-end;
  z-index: 1;
  position: relative;
  display: flex;
  will-change: min-width width;
`;

export const Content = styled.main`
  display: flex;
  width: 100%;
  min-width: 0;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 4.5rem;
  flex-shrink: 0;
`;

export const Body = styled.div<{ scrollable?: boolean | 'mobileOnly' }>`
  flex: 1 1 auto;
  ${({ scrollable }) => mobileOnlyScrollable(scrollable)};
  // to fix chrome flex
  min-width: 0;
  min-height: 0;
`;

export const Footer = styled.footer`
  // height: 3rem;
  flex-shrink: 0;
`;

export const Resizer = styled.div`
  width: 24px;
  height: 100%;
`;
