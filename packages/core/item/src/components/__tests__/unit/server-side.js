/**
 * @jest-environment node
 */
// @flow
import React from 'react';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import ReactDOMServer from 'react-dom/server';

test('Item server side rendering', async () => {
  (await getExamplesFor('item')).forEach(examples => {
    // $StringLitteral
    if (!examples.filePath.includes('item-story')) {
      /* item story example contains import on react-router-dom */
      // $StringLitteral
      const Example = require(examples.filePath).default; // eslint-disable-line import/no-dynamic-require
      expect(() =>
        ReactDOMServer.renderToString(<Example />),
      ).not.toThrowError();
    }
  });
});
