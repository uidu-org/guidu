import './wdyr';

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import 'regenerator-runtime/runtime';
import App from './containers/App';
// import './index.scss';
import './utils/polyfills';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
