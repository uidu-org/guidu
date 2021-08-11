import * as React from 'react';
import { render } from 'react-dom';
import 'regenerator-runtime/runtime';
import App from './containers/App';
import './utils/polyfills';

if (process.env.NODE_ENV !== 'production' && process.env.TRACK_RENDERS) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

render(<App />, document.getElementById('app'));
