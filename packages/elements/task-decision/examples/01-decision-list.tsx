import { ReactRenderer as Renderer } from '@uidu/renderer';
import * as React from 'react';
import { document, dumpRef } from '../examples-utils/story-utils';
import DecisionItem from '../src/components/DecisionItem';
import DecisionList from '../src/components/DecisionList';

export default () => (
  <div>
    <h3>Simple DecisionList</h3>
    <DecisionList>
      <DecisionItem contentRef={dumpRef}>
        Hello <b>world</b>.
      </DecisionItem>
      <DecisionItem contentRef={dumpRef}>
        <Renderer document={document} />
      </DecisionItem>
      <DecisionItem contentRef={dumpRef}>
        Hello <b>world</b>.
      </DecisionItem>
      <DecisionItem contentRef={dumpRef}>
        <Renderer document={document} />
      </DecisionItem>
    </DecisionList>

    <h3>Single item DecisionList</h3>
    <DecisionList>
      <DecisionItem contentRef={dumpRef}>
        Hello <b>world</b>.
      </DecisionItem>
    </DecisionList>

    <h3>Empty DecisionList</h3>
    <DecisionList />
  </div>
);
