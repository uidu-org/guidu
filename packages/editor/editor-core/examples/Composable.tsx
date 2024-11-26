import { ShellMain } from '@uidu/shell';
import { GuiduThemeProvider } from '@uidu/theme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import FullEditor from '../examples-utils/FullEditor';

export default function Composable() {
  return (
    <IntlProvider locale="en">
      <style>
        {`.is-empty::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }`}
      </style>
      <ShellMain>
        <GuiduThemeProvider>
          <FullEditor />
        </GuiduThemeProvider>
      </ShellMain>
    </IntlProvider>
  );
}
