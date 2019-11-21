import { layers, math } from '@uidu/theme';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import styled from 'styled-components';
const { multiply } = math;

export default styled.div`
  bottom: 2rem;
  left: 5rem;
  position: fixed;
  z-index: ${layers.flag};

  @media (max-width: 560px) {
    bottom: 0;
    left: 0;
  }
`;

export const SROnly = styled.h1`
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Inner = styled(TransitionGroup)`
  position: relative;
`;
