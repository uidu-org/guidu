import styled from 'styled-components';
import tw, { theme } from 'twin.macro';

export default styled.div<{
  isStacked: boolean;
  paddingRight: number;
  isTinted: boolean;
  canClickThrough: boolean;
}>`
  ${tw`fixed top-0 bottom-0 left-0 transition-opacity duration-200 bg-secondary bg-opacity-40`}
  ${({ isTinted }) => (isTinted ? tw`opacity-100` : tw`opacity-0`)}
  ${({ canClickThrough }) =>
    canClickThrough ? tw`pointer-events-none` : tw`pointer-events-auto`}
  right: ${({ paddingRight }) => `${paddingRight}px`};
  z-index: ${({ isStacked }) =>
    isStacked ? `${theme`zIndex.blanket`} + 1` : theme`zIndex.blanket`};
`;
