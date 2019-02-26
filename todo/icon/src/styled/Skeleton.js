// @flow

import styled from 'styled-components';
import { sizes } from '../constants';

export default styled.div`
  width: ${props => sizes[props.size]};
  height: ${props => sizes[props.size]};
  display: inline-block;
  border-radius: 50%;
  background-color: ${({ color }) => color || 'currentColor'};
  opacity: ${({ weight }) => (weight === 'strong' ? 0.3 : 0.15)};
`;
