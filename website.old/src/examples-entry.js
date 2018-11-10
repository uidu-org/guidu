// @flow
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import cssResetStyles from '@atlaskit/css-reset';
import 'regenerator-runtime/runtime';
import insertStyleSheetInHead from './utils/insertStyleSheetInHead';
import ExamplesLoader from './pages/Examples/loader';

insertStyleSheetInHead(cssResetStyles);

const componentNode = document.getElementById('examples');
if (typeof window !== 'undefined') {
  window.unmountApp = function unmountApp() {
    return unmountComponentAtNode(componentNode);
  };
}
render(<ExamplesLoader />, componentNode);
