import styled from 'styled-components';

import { borderRadius, size as csssize } from '../../mixins';

export interface ImageProps {
  size: number;
}

export const Image = styled.img<ImageProps>`
  ${({ size }: ImageProps) => csssize(size)} ${borderRadius};

  /* hide the alt text when the image cannot be found */
  overflow: hidden;
`;
