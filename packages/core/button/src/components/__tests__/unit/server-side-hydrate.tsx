import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getExamplesFor } from '@atlaskit/build-utils/getExamples';
import { ssr } from '@atlaskit/ssr';

jest.spyOn(global.console, 'error');

// Warning from React referring to @emotion's injected style tag
const warningRegEx = new RegExp(
  'Warning: Did not expect server HTML to contain a <style*',
);

afterEach(() => {
  jest.resetAllMocks();
});

test('should ssr then hydrate button correctly', async () => {
  const [example] = await getExamplesFor('button');
  // $StringLitteral
  const Example = require(example.filePath).default; // eslint-disable-line import/no-dynamic-require

  const elem = document.createElement('div');
  elem.innerHTML = await ssr(example.filePath);

  ReactDOM.hydrate(<Example />, elem);

  /* tslint:disable no-console */
  // @ts-ignore
  const mockCalls = console.error.mock.calls;
  const filtered = mockCalls.filter((mock: any) => !warningRegEx.test(mock));
  const mockCallsWithoutStyleErrors = filtered.reduce(
    (a: any, v: any) => a.concat(v),
    [],
  );
  expect(mockCallsWithoutStyleErrors).toHaveLength(0);
});
