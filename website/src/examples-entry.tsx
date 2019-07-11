import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import 'regenerator-runtime/runtime';
import './index.scss';
import ExamplesLoader from './pages/Examples/loader';
import { Window } from './types';

const componentNode = document.getElementById('examples');
if (typeof window !== 'undefined' && componentNode) {
  (window as Window).unmountApp = function unmountApp() {
    return unmountComponentAtNode(componentNode);
  };
}
render(<ExamplesLoader />, componentNode);
