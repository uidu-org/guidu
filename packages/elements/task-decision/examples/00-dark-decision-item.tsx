import { ReactRenderer as Renderer } from '@uidu/renderer';
// @ts-ignore
import { GuiduThemeProvider } from '@uidu/theme';
import * as React from 'react';
import { document, dumpRef } from '../examples-utils/story-utils';
import DecisionItem from '../src/components/DecisionItem';

export default () => (
  <GuiduThemeProvider mode={'dark'}>
    <div style={{ padding: '10px' }}>
      <h3>Simple DecisionItem</h3>
      <DecisionItem contentRef={dumpRef}>
        Hello <b>world</b>.
      </DecisionItem>

      <h3>Long DecisionItem</h3>
      <DecisionItem contentRef={dumpRef}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </DecisionItem>

      <h3>Simple DecisionItem with renderer</h3>
      <DecisionItem contentRef={dumpRef}>
        <Renderer document={document} />
      </DecisionItem>

      <h3>Simple DecisionItem with placeholder</h3>
      <DecisionItem contentRef={dumpRef} showPlaceholder={true} />
    </div>
  </GuiduThemeProvider>
);
