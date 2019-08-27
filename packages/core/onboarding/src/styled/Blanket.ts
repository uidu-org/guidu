import { DN90A, layers, N100A, themed } from '@uidu/theme';
import styled from 'styled-components';

// NOTE:
// we can't use @uidu/blanket
// because it has to sit on top of other layered elements (i.e. Modal).

const backgroundColor = themed({ light: N100A, dark: DN90A });

// IE11 and Edge: z-index needed because fixed position calculates z-index relative
// to body insteadof nearest stacking context (Portal in our case).
export default styled.div<{ isTinted: boolean }>`
  background: ${p => (p.isTinted ? backgroundColor : 'transparent')};
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  transition: opacity 220ms;
  z-index: ${layers.spotlight};
`;
