import styled from 'styled-components';
import { mobileOnlyScrollable } from '../../utils';

export const Body = styled.div<{ scrollable?: boolean | 'mobileOnly' }>`
  flex: 1 1 auto;
  ${({ scrollable }) => mobileOnlyScrollable(scrollable)};
  // to fix chrome flex
  min-width: 0;
  min-height: 0;
  position: relative;
`;

export const ObserverComponent = styled.div`
  width: 100%;
`;

export const Shadow = styled.div<{ active: boolean; width: number }>`
  position: fixed;
  height: 10px;
  overflow: hidden;
  /* top: 0; */
  width: ${({ width }) => `${width}px`};
  z-index: 1;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 0;
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
    box-shadow: 0px 1px 9px 1px rgba(204, 204, 204, 0.8);
  }
`;
