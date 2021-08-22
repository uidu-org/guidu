import { css } from 'styled-components';
import tw from 'twin.macro';

export function getPinnedStyled({ pinned = 'left', index }) {
  if (pinned === 'left') {
    return css`
      left: ${index === 0 ? 0 : '56px'};
      background: rgb(var(--body-on-primary-bg));
      ${tw`border-r border-opacity-50 z-10 sticky!`}
    `;
  }
  if (pinned === 'right') {
    return css`
      right: ${index === 0 ? 0 : 0};
      background: rgb(var(--body-on-primary-bg));
      ${tw`border-l border-opacity-50 z-10 sticky!`}
    `;
  }
}
