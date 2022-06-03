import * as React from 'react';
import { createRoot } from 'react-dom/client';
import 'regenerator-runtime/runtime';
import App from './containers/App';
// import './index.scss';
import './utils/polyfills';

if (process.env.NODE_ENV !== 'production' && process.env.TRACK_RENDERS) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
