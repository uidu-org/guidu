// @flow
import Button from '@atlaskit/button';
import styled, { css } from 'styled-components';

const ButtonElement = styled(Button)`
  ${({ truncationWidth }: { truncationWidth: number }) =>
    truncationWidth
      ? css`
          max-width: ${truncationWidth}px !important;
        `
      : css`
          flex-shrink: 1;
          min-width: 0;
        `};
`;

export default ButtonElement;
