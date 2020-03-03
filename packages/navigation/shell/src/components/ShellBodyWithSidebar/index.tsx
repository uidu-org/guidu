import React from 'react';
import styled from 'styled-components';
import ShellBody from '../ShellBody';

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  overflow: hidden;
`;

const Inner = styled.div`
  /* -webkit-overflow-scrolling: touch; */
  height: auto;
  flex: 1 1 auto;
  scroll-behavior: smooth;
  overflow-y: scroll;
  overscroll-behavior-y: contain;
`;

const ShellBodyWithSidebar = ({
  children,
  sidebar,
  forwardedRef,
  shadowOnScroll = true,
}) => (
  <Wrapper>
    <ShellBody ref={forwardedRef} scrollable shadowOnScroll={shadowOnScroll}>
      {children}
    </ShellBody>
    {sidebar}
  </Wrapper>
);

export default React.forwardRef((props: any, ref) => {
  return <ShellBodyWithSidebar {...props} forwardedRef={ref} />;
});
