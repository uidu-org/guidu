// @flow

import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';
import { Theme, withTheme } from '@atlaskit/theme';
import { theme } from '../theme';
import { getInnerStyles } from './utils';

export default (props: { children: Node, stackIndex: ?number }) => (
  <Theme theme={theme}>
    {({ avatar }) => {
      const { dimensions } = avatar({ ...props, includeBorderWidth: true });
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
  </Theme>
);

// TODO this doesn't appear to be used anywhere so we should look at removing.
export const Inner = withTheme(styled.div`
  ${getInnerStyles};
`);

export const PresenceWrapper = (props: { children: Node }) => (
  <Theme theme={theme}>
    {({ avatar }) => {
      const { presence } = avatar(props);
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
  </Theme>
);

export const StatusWrapper = (props: { children: Node }) => (
  <Theme theme={theme}>
    {({ avatar }) => {
      const { status } = avatar(props);
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
  </Theme>
);
