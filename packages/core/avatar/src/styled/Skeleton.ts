import styled from 'styled-components';
import { AppearanceType, SizeType } from '../types';
import { AVATAR_RADIUS, AVATAR_SIZES, BORDER_WIDTH } from './constants';

const Skeleton = styled.div<{
  size?: SizeType;
  appearance?: AppearanceType;
  weight?: string;
}>`
  width: ${({ size }) => AVATAR_SIZES[size || 'small']}px;
  height: ${({ size }) => AVATAR_SIZES[size || 'small']}px;
  display: inline-flex;
  border-radius: ${(props) =>
    props.size && props.appearance === 'square'
      ? `${AVATAR_RADIUS[props.size]}px`
      : '50%'};
  background-color: ${({ color }) => color || 'currentColor'};
  border: ${({ size }) => BORDER_WIDTH[size || 'small']}px solid transparent;
  opacity: ${({ weight }) => (weight === 'strong' ? 0.3 : 0.15)};
`;

export default Skeleton;
