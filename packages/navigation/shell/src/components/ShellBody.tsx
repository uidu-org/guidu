import React, { forwardRef, Ref } from 'react';
import styled from 'styled-components';

export const ShellBody = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
`;

export default forwardRef((props, ref: Ref<HTMLDivElement>) => (
  <ShellBody {...props} ref={ref} />
));
