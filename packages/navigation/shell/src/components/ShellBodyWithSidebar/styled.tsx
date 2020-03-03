import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  overflow: hidden;
`;

export const Inner = styled.div`
  /* -webkit-overflow-scrolling: touch; */
  height: auto;
  flex: 1 1 auto;
  scroll-behavior: smooth;
  overflow-y: scroll;
  overscroll-behavior-y: contain;
`;
