import styled from 'styled-components';

import { ComponentClass, ImgHTMLAttributes } from 'react';
import { borderRadius, size as csssize } from '../../mixins';

export interface ImageProps {
  size: number;
}

export const Image: ComponentClass<
  ImgHTMLAttributes<{}> & ImageProps
> = styled.img`
  ${({ size }: ImageProps) => csssize(size)} ${borderRadius};

  /* hide the alt text when the image cannot be found */
  overflow: hidden;
`;
