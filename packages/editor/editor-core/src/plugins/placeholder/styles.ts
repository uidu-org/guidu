// @ts-ignore: unused variable
import { colors } from '@uidu/theme';
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
