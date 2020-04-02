import { DN90A, N100A } from '@uidu/theme/colors';
import { themed } from '@uidu/theme/components';
import { layers } from '@uidu/theme/constants';
import styled from 'styled-components';

const backgroundColor = themed({ light: N100A, dark: DN90A });
export const opacity = (p: any) => (p.isTinted ? 1 : 0);
export const pointerEvents = (p: any) =>
  p.canClickThrough ? 'none' : 'initial';

export default styled.div<{ isStacked?: boolean; paddingRight?: number }>`
  background: ${backgroundColor};
  bottom: 0;
  left: 0;
  opacity: ${opacity};
  pointer-events: ${pointerEvents};
  position: fixed;
  right: ${({ paddingRight }) => `${paddingRight}px`};
  top: 0;
  transition: opacity 220ms;
  z-index: ${({ isStacked }) =>
    isStacked ? layers.blanket() + 1 : layers.blanket()};
`;
