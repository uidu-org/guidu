import { ShellHeader } from '@uidu/shell';
import React from 'react';
import styled from 'styled-components';

const NavigationHeaderMultilineContent = styled.div`
  padding: 0 2.25rem;
`;

const ShellHeaderMultiline = styled(ShellHeader)`
  padding-top: 1.75rem;
  padding-bottom: 1.75rem;
  height: auto;
`;

export default function NavigationHeaderMultiline({ children }) {
  return (
    <ShellHeaderMultiline>
      <NavigationHeaderMultilineContent>
        {children}
      </NavigationHeaderMultilineContent>
    </ShellHeaderMultiline>
  );
}
