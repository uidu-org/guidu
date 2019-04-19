import styled from 'styled-components';
import MediaWrap from './wrap';
import { imageProxy } from '../../../utils';

const Image = styled(MediaWrap)<any>`
  background-image: ${({ imageUrl }) =>
    imageUrl ? `url('${imageProxy(imageUrl)}')` : ''};
`;

Image.defaultProps = {};

export default Image;
