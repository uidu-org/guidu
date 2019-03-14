import styled from 'styled-components';
import { ComponentClass, HTMLAttributes } from 'react';

export const IconPlaceholderWrapper: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  position: absolute;
  left: 0;
`;

export const Icon: ComponentClass<HTMLAttributes<{}>> = styled(
  IconPlaceholderWrapper,
)`
  top: 0.5px;
  & > img {
    width: 16px;
    height: 16px;
  }
`;

export const AKIconWrapper: ComponentClass<HTMLAttributes<{}>> = styled(
  IconPlaceholderWrapper,
)`
  top: 0.5px;
  transform: scale(1.4);
`;
