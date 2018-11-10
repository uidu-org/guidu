// @flow
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import './index.scss';
import 'regenerator-runtime/runtime';
import ExamplesLoader from './pages/Examples/loader';

const componentNode = document.getElementById('examples');
if (typeof window !== 'undefined') {
  window.unmountApp = function unmountApp() {
    return unmountComponentAtNode(componentNode);
  };
}
render(<ExamplesLoader />, componentNode);
