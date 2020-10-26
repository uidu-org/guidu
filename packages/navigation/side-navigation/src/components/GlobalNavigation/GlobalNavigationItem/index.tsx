/* eslint-disable react/jsx-props-no-spreading */

import Tooltip from '@uidu/tooltip';
import React from 'react';
import styled from 'styled-components';
import StyledGlobalItem, { StyledGlobalItemButton } from './styled';

const StyledBadge = styled.div`
  pointer-events: none;
  position: absolute;
  user-select: none;
  left: 20px;
  top: -4px;
`;

export default function GlobalItem({ as = 'a', badge, tooltip, ...rest }: any) {
  const content = (
    <StyledGlobalItem>
      <StyledGlobalItemButton as={as} {...rest} />
      {!!badge && <StyledBadge>{badge}</StyledBadge>}
    </StyledGlobalItem>
  );

  if (tooltip) {
    return (
      <Tooltip
        delay={0}
        content={tooltip}
        position="right"
        hideTooltipOnClick
        hideTooltipOnMouseDown
      >
        {content}
      </Tooltip>
    );
  }

  return content;
}
