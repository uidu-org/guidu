// @ts-ignore: unused variable
import {
  blockquoteSharedStyles,
  headingsSharedStyles,
} from '@atlaskit/editor-common';
import { css } from 'styled-components';

export const blocktypeStyles = css`
  .ProseMirror {
    ${blockquoteSharedStyles};
    ${headingsSharedStyles};
  }
`;
