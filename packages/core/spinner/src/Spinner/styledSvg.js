// @flow

import styled, { css, keyframes } from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
import type { SpinnerPhases } from '../types';
import { SIZES_MAP } from './constants';

type StyleParams = {
  invertColor: boolean,
  phase: SpinnerPhases,
  size: number,
};

const getStrokeWidth = (size: number) => Math.round(size / 10);

const getStrokeCircumference = (size: number) => {
  const strokeWidth = getStrokeWidth(size);
  const strokeRadius = size / 2 - strokeWidth / 2;
  return Math.PI * strokeRadius * 2;
};

/* Define keyframes statically to prevent a perfomance issue in styled components v1 where the keyframes function
 * does not cache previous values resulting in each spinner injecting the same keyframe definition
 * in the DOM.
 * This can be reverted to dynamic keyframes when we upgrade to styled components v2
 */
const keyframeNames = {
  noop: keyframes`
    from { opacity: 0; }
    to { opacity: 0; }
  `,
  rotate: keyframes`
    to { transform: rotate(360deg); }
  `,
  enterOpacity: keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `,
  smallEnterStroke: keyframes`
    from { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.small)}px; }
    to { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.small) *
      0.8}px; }
  `,
  mediumEnterStroke: keyframes`
    from { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.medium)}px; }
    to { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.medium) *
      0.8}px; }
  `,
  largeEnterStroke: keyframes`
    from { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.large)}px; }
    to { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.large) *
      0.8}px; }
  `,
  xlargeEnterStroke: keyframes`
    from { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.xlarge)}px; }
    to { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.xlarge) *
      0.8}px; }
  `,
};

/* If a standard size is used, we can use one of our statically defined keyframes, otherwise
 * we're forced to dynamically create the keyframe and incur a performance cost.
 */
const getEnterStrokeKeyframe = (size: number) => {
  const standardSizeName = Object.keys(SIZES_MAP).find(
    sizeName => size === SIZES_MAP[sizeName],
  );
  if (standardSizeName) {
    return keyframeNames[`${standardSizeName}EnterStroke`];
  }

  const circumference = getStrokeCircumference(size);
  return keyframes`
    from { stroke-dashoffset: ${circumference}px; }
    to { stroke-dashoffset: ${circumference * 0.8}px; }
  `;
};

const spinnerColor = themed({ light: colors.N500, dark: colors.N0 });
const spinnerColorInverted = themed({ light: colors.N0, dark: colors.N0 });

export const getStrokeColor = ({
  invertColor,
  ...props
}: {
  invertColor?: boolean,
}): string | number =>
  // $FlowFixMe - theme is not found in props
  invertColor ? spinnerColorInverted(props) : spinnerColor(props);

const getActiveAnimations = props => {
  const idleRotation = css`
    0.86s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite
      ${keyframeNames.rotate};
  `;

  const spinUpStroke = css`
    0.8s ease-in-out ${getEnterStrokeKeyframe(props.size)};
  `;

  const spinUpOpacity = css`
    0.2s ease-in-out ${keyframeNames.enterOpacity};
  `;

  const activeAnimations = [idleRotation];
  if (props.phase === 'ENTER') {
    activeAnimations.push(spinUpStroke, spinUpOpacity);
  }
  return activeAnimations;
};

const Svg = styled.svg`
  animation: ${props => getActiveAnimations(props)}}
  fill: none;
  stroke: ${getStrokeColor};
  stroke-dasharray: ${props => getStrokeCircumference(props.size)}px;
  stroke-dashoffset: ${props => getStrokeCircumference(props.size) * 0.8}px;
  stroke-linecap: round;
  stroke-width: ${props => getStrokeWidth(props.size)}px;
  transform-origin: center;
`;
Svg.displayName = 'SpinnerSvg';
export default Svg;
