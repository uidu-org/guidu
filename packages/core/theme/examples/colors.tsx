// @flow

import React, { Fragment } from 'react';
import color from 'color';
import { colors } from '../src';

export default () => (
  <Fragment>
    {Object.keys(colors)
      .filter(c => typeof colors[c] === 'string')
      .map(c => (
        <span
          key={c}
          style={{
            backgroundColor: colors[c],
            borderRadius: 3,
            color: color(colors[c]).negate(),
            display: 'inline-block',
            marginBottom: 10,
            marginRight: 10,
            padding: 10,
          }}
        >
          {c}
        </span>
      ))}
  </Fragment>
);
