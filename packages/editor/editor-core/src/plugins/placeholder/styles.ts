import { css } from 'styled-components';
import { theme } from 'twin.macro';

export const placeHolderClassName = 'placeholder-decoration';

export const placeholderStyles = css`
  .ProseMirror .${placeHolderClassName} {
    position: relative;
    color: ${theme`colors.gray.500`};
    width: 100%;

    pointer-events: none;
    display: block;
    user-select: none;

    > span {
      position: absolute;
      pointer-events: none;
      outline: none;
    }

    &.align-end > span {
      right: 0;
    }

    &.align-center > span {
      left: 0;
    }
  }
`;
