/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { colors, focusRing } from '../src';

const InteractiveElement = ({ color, outlineWidth, children }: any) => (
  <div
    tabIndex={0}
    css={css`
      /* focusRing(color, outlineWidth) */
      ${focusRing(color, outlineWidth)};
      padding: 16px;
      border-radius: 3px;
    `}
  >
    {children}
  </div>
);

export default () => {
  return (
    <div>
      <InteractiveElement>Default</InteractiveElement>
      <InteractiveElement color={colors.G200}>Custom color</InteractiveElement>
      <InteractiveElement color={colors.Y200} outlineWidth={5}>
        Custom outline width
      </InteractiveElement>
    </div>
  );
};
