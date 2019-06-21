// @ts-ignore: unused variable
// prettier-ignore
import { colors } from '@atlaskit/theme';
import { css } from 'styled-components';

export const placeholderStyles = css`
  .ProseMirror .placeholder-decoration {
    position: relative;
    color: ${colors.N90};
    pointer-events: none;
    display: block;

    > span {
      position: absolute;
      pointer-events: none;
    }
  }
`;
