import * as path from 'path';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export const ssr_hydrate = async (
  dirName: string,
  relativeFilePath: string,
): Promise<Element> => {
  const filePath = path.resolve(dirName, relativeFilePath);
  const Example = require(filePath).default;
  const elem = document.createElement('div');

  ReactDOM.hydrate(<Example />, elem);
  return elem;
};
