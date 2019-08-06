import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  overflow: hidden;
`;

const Inner = styled.div`
  -webkit-overflow-scrolling: touch;
  height: auto;
  flex: 1 1 auto;
  scroll-behavior: smooth;
  overflow-y: scroll;
  overscroll-behavior-y: contain;
`;

export default ({ children, sidebar }) => (
  <Wrapper>
    <Inner>{children}</Inner>
    {sidebar}
  </Wrapper>
);
