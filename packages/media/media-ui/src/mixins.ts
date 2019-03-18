import { css, keyframes } from 'styled-components';
import { borderRadius as akBorderRadius } from '@uidu/theme';

export const ellipsis = (maxWidth: string | number = '100%') => {
  const unit = typeof maxWidth === 'number' ? 'px' : '';

  return css`
    max-width: ${maxWidth} ${unit};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;
};

export const size = (value: string | number = '100%') => {
  const unit = typeof value === 'number' ? 'px' : '';

  return css`
    width: ${value} ${unit};
    height: ${value} ${unit};
  `;
};

export const center = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const absolute = (top = 0, left = 0) => css`
  position: absolute;
  top: ${top}px;
  left: ${left}px;
`;

export const borderRadius = css`
  border-radius: ${akBorderRadius()}px;
`;

export const borderRadiusBottom = css`
  border-bottom-left-radius: ${akBorderRadius()}px;
  border-bottom-right-radius: ${akBorderRadius()}px;
`;

export const easeInOutCubic = css`cubic-bezier(0.645, 0.045, 0.355, 1)`;

export const fadeInKeyframe = keyframes`
  0%{
    opacity: 0;
  }

  100%{
    opacity: 1;
  }
`;

export const fadeIn = css`
  animation: ${fadeInKeyframe} 0.3s ${easeInOutCubic};
`;
