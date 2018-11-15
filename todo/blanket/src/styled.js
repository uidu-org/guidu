// @flow
import styled from 'styled-components';
import { colors, themed, layers } from '@atlaskit/theme';

const backgroundColor = themed({ light: colors.N100A, dark: colors.DN90A });
export const opacity = (p: any) => (p.isTinted ? 1 : 0);
export const pointerEvents = (p: any) =>
  p.canClickThrough ? 'none' : 'initial';

export default styled.div`
  background: ${backgroundColor};
  bottom: 0;
  left: 0;
  opacity: ${opacity};
  pointer-events: ${pointerEvents};
  position: fixed;
  right: 0;
  top: 0;
  transition: opacity 220ms;
  z-index: ${layers.blanket};
`;
