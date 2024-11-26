import { css } from 'styled-components';

export const listsStyles = css`
  .ProseMirror li {
    position: relative;
    > p:first-child {
      margin-top: 0;
    }
    > p:last-child {
      margin-bottom: 0;
    }
  }

  /* Make sure li selections wrap around markers */
  li.ProseMirror-selectednode {
    outline: none;
  }

  li.ProseMirror-selectednode::after {
    content: '';
    position: absolute;
    left: -32px;
    right: -2px;
    top: -2px;
    bottom: -2px;
    border: 2px solid #8cf;
    pointer-events: none;
  }
`;
