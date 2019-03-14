import * as React from 'react';
import styled from 'styled-components';

export const Wrapper: React.ComponentClass<
  React.HTMLAttributes<{}>
> = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 12px;
  > * + * {
    margin-left: 12px;
  }
`;

export const Left: React.ComponentClass<React.HTMLAttributes<{}>> = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  > * {
    /* hack to vertically center the spinner which is display: inline-block; */
    display: inline-flex;
  }
`;

export const Middle: React.ComponentClass<
  React.HTMLAttributes<{}>
> = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  overflow: hidden;
`;

export const Right: React.ComponentClass<React.HTMLAttributes<{}>> = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;
