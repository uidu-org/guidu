import './wdyr'; // <--- first import

import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { createRoot } from 'react-dom/client';
import 'regenerator-runtime/runtime';
import ExamplesLoader from './pages/Examples/loader';
import { Window } from './types';

const componentNode = document.getElementById('examples');

if (typeof window !== 'undefined' && componentNode) {
  (window as Window).unmountApp = function unmountApp() {
    return unmountComponentAtNode(componentNode);
  };
}

const root = createRoot(componentNode); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <ExamplesLoader />
  </React.StrictMode>,
);
