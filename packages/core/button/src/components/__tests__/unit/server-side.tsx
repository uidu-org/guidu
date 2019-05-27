/**
 * @jest-environment node
 */
import { getExamplesFor } from '@uidu/build-utils/getExamples';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

test('Button server side rendering', async () => {
  (await getExamplesFor('button')).forEach((examples: any) => {
    const Example = require(examples.filePath).default;
    expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
  });
});
