// @flow
import { css } from 'styled-components';
import type { Color } from '../theme/types';

export const truncate = (width: string = '100%') => css`
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: ${width};
`;

export const focusOutline = (color?: Color) => css`
  outline: none;
  box-shadow: 0 0 0 2px ${color || ''};
`;
