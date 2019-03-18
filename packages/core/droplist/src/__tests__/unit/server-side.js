/**
 * @jest-environment node
 */
// @flow
import React from 'react';
import { getExamplesFor } from '@uidu/build-utils/getExamples';
import ReactDOMServer from 'react-dom/server';

test('Droplist server side rendering', async () => {
  (await getExamplesFor('Droplist')).forEach(examples => {
    // $StringLitteral
    const Example = require(examples.filePath).default; // eslint-disable-line import/no-dynamic-require
    expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
  });
});
