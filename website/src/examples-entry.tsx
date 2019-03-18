import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import cssResetStyles from '@atlaskit/css-reset';
import './index.scss';

import 'regenerator-runtime/runtime';
import insertStyleSheetInHead from './utils/insertStyleSheetInHead';
import ExamplesLoader from './pages/Examples/loader';
import { Window } from './types';

insertStyleSheetInHead(cssResetStyles);

const componentNode = document.getElementById('examples');
if (typeof window !== 'undefined' && componentNode) {
  (window as Window).unmountApp = function unmountApp() {
    return unmountComponentAtNode(componentNode);
  };
}
render(<ExamplesLoader />, componentNode);
