import { ShellMain } from '@uidu/shell';
import { GuiduThemeProvider } from '@uidu/theme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import FullEditor from '../examples-utils/FullEditor';

export default function Composable() {
  return (
    <IntlProvider locale="en">
      <ShellMain>
        <GuiduThemeProvider>
          <FullEditor />
        </GuiduThemeProvider>
      </ShellMain>
    </IntlProvider>
  );
}
