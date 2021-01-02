import React from 'react';
import styled, { css } from 'styled-components';

function justifyContent(props) {
  if (props.align === 'left') {
    return css`
      justify-content: flex-start;
      margin-left: 1rem;
    `;
  } else if (props.align === 'right') {
    return css`
      justify-content: flex-end;
      margin-right: 1rem;
    `;
  }
  return css`
    justify-content: center;
    margin: 0 1rem;
  `;
}

const PrimaryActions = styled.div<{ align: 'left' | 'center' | 'right' }>`
  align-items: stretch;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0px;
  height: 100%;
  position: relative;
  /* overflow: hidden; */

  ${justifyContent}

  & > * {
    margin: 0px 4px;
  }
`;

export default function ({ children, align = 'left' }) {
  return <PrimaryActions align={align}>{children}</PrimaryActions>;
}
