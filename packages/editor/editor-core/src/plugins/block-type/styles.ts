import {
  blockquoteSharedStyles,
  headingsSharedStyles,
} from '@uidu/editor-common';
import { css } from 'styled-components';

export const blocktypeStyles = css`
  .ProseMirror {
    ${blockquoteSharedStyles};
    /* ${headingsSharedStyles}; */
  }
`;
