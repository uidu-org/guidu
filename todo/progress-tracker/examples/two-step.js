// @flow

import React from 'react';
import { ProgressTracker } from '../src';

const css = `
  .sample {
    margin: auto;
  }
`;

const items = [
  {
    id: 'visited-1',
    label: 'Visited Step',
    percentageComplete: 100,
    status: 'visited',
    href: '#',
  },
  {
    id: 'current-1',
    label: 'Current Step',
    percentageComplete: 0,
    status: 'current',
    href: '#',
  },
];

export default () => (
  <div>
    <style>{css}</style>
    <div className="sample">
      <ProgressTracker items={items} />
    </div>
  </div>
);
