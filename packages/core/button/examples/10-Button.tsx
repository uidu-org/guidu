import * as React from 'react';
import { RouterButton } from '..';

export default () => (
  <RouterButton
    to="/"
    tw="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    Button
  </RouterButton>
);
