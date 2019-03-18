// @flow
import { css } from 'styled-components';

import * as colors from './colors';
import { gridSize, fontSize } from './index';

const baseHeading = (size, lineHeight) => `
  font-size: ${size / fontSize()}em;
  font-style: inherit;
  line-height: ${lineHeight / size};
`;

export const h900 = () => css`
  ${baseHeading(35, 40)} color: ${colors.heading};
  font-weight: 500;
  letter-spacing: -0.01em;
`;

export const h800 = () => css`
  ${baseHeading(29, 32)} color: ${colors.heading};
  font-weight: 600;
  letter-spacing: -0.01em;
`;

export const h700 = () => css`
  ${baseHeading(24, 28)} color: ${colors.heading};
  font-weight: 500;
  letter-spacing: -0.01em;
`;

export const h600 = () => css`
  ${baseHeading(20, 24)} color: ${colors.heading};
  font-weight: 500;
  letter-spacing: -0.008em;
`;

export const h500 = () => css`
  ${baseHeading(16, 20)} color: ${colors.heading};
  font-weight: 600;
  letter-spacing: -0.006em;
`;

export const h400 = () => css`
  ${baseHeading(14, 16)} color: ${colors.heading};
  font-weight: 600;
  letter-spacing: -0.003em;
`;

export const h300 = () => css`
  ${baseHeading(12, 16)} color: ${colors.heading};
  font-weight: 600;
  text-transform: uppercase;
`;

export const h200 = () => css`
  ${baseHeading(12, 16)} color: ${colors.subtleHeading};
  font-weight: 600;
  ${'' /* margin-top: ${gridSize() * 2}px; */}
`;

export const h100 = () => css`
  ${baseHeading(11, 16)} color: ${colors.subtleHeading};
  font-weight: 700;
`;
