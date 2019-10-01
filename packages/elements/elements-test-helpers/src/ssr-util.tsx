import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ssr } from '@atlaskit/ssr';
// @ts-ignore FS-3905
import * as path from 'path';

export const ssr_hydrate = async (
  dirName: string,
  relativeFilePath: string,
): Promise<Element> => {
  const filePath = path.resolve(dirName, relativeFilePath);
  const Example = require(filePath).default;
  const elem = document.createElement('div');
  elem.innerHTML = await ssr(filePath);

  // note: it is required to clear any dirty state to make sure hydration runs without interference
  jest.resetModules();

  ReactDOM.hydrate(<Example />, elem);
  return elem;
};
