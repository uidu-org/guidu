// @flow

import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';
import { withTheme } from '@atlaskit/theme';
import { Theme } from '../theme';
import { getInnerStyles } from './utils';

export default (props: { children: Node, stackIndex: ?number }) => (
  <Theme.Consumer {...props} includeBorderWidth>
    {({ dimensions }) => {
      return (
        <div
          style={{
            display: 'inline-block',
            position: 'relative',
            outline: 0,
            zIndex: props.stackIndex,
            ...dimensions,
          }}
        >
          {props.children}
        </div>
      );
    }}
  </Theme.Consumer>
);

// TODO this doesn't appear to be used anywhere so we should look at removing.
export const Inner = withTheme(styled.div`
  ${getInnerStyles};
`);

export const PresenceWrapper = (props: { children: Node }) => (
  <Theme.Consumer {...props} includeBorderWidth>
    {({ presence }) => {
      return (
        <span
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            ...presence,
          }}
        >
          {props.children}
        </span>
      );
    }}
  </Theme.Consumer>
);

export const StatusWrapper = (props: { children: Node }) => (
  <Theme.Consumer {...props} includeBorderWidth>
    {({ status }) => {
      return (
        <span
          style={{
            position: 'absolute',
            ...status,
          }}
        >
          {props.children}
        </span>
      );
    }}
  </Theme.Consumer>
);
