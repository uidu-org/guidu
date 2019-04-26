import styled, { css } from 'styled-components';

const mobileOnlyHeight = (fixedHeight: boolean | 'mobileOnly') => {
  if (fixedHeight === 'mobileOnly') {
    return css`
      @media (max-width: 700px) {
        height: 100vh;
      }
      height: auto;
    `;
  }
  if (fixedHeight) {
    return css`
      height: 100vh;
    `;
  }
  return css`
    height: auto;
  `;
};

const mobileOnlyScrollable = (scrollable: boolean | 'mobileOnly') => {
  if (scrollable === 'mobileOnly') {
    return css`
      @media (max-width: 700px) {
        overflow-y: scroll;
      }
    `;
  }
  if (scrollable) {
    return css`
      overflow-y: scroll;
    `;
  }
  return css``;
};

export const Wrapper = styled.div<{
  fixedHeight: boolean | 'mobileOnly';
}>`
  display: flex;

  ${({ fixedHeight }) => mobileOnlyHeight(fixedHeight)};
  width: 100%;
`;

export const Sidebar = styled.aside`
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-between;
`;

export const Navigation = styled.aside`
  flex-direction: column;
  justify-content: space-between;
`;

export const Content = styled.main`
  display: flex;
  width: 100%;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
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
`;

export const Footer = styled.footer`
  // height: 3rem;
  flex-shrink: 0;
`;
