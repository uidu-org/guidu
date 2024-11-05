import { headingsSharedStyles } from '@uidu/editor-common';
import styled from 'styled-components';
import { Shortcut } from '../../../../ui/styles';

export const BlockTypeMenuItem = styled.div`
  /* ${headingsSharedStyles}; */
  > {
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
`;

export const KeyboardShortcut = styled(Shortcut)<{
  selected?: boolean;
}>`
  ${(props) => (props.selected ? `color: rgb(var(--brand-primary));` : '')}
`;
