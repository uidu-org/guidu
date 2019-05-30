/**
 * @jest-environment node
 */
// @flow
import { getExamplesFor } from '@uidu/build-utils/getExamples';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

test('Layer server side rendering', async () => {
  (await getExamplesFor('layer')).forEach(examples => {
    // $StringLitteral
    const Example = require(examples.filePath).default; // eslint-disable-line import/no-dynamic-require
    expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
  });
});
