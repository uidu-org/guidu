// @flow

import React, { type ElementRef } from 'react';
import { layers } from '@atlaskit/theme';

export const LayoutContainer = (props: {}) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
    }}
    {...props}
  />
);

export const NavigationContainer = ({ innerRef, ...props }: *) => (
  <div
    ref={innerRef}
    css={{
      bottom: 0,
      display: 'flex',
      flexDirection: 'row',
      left: 0,
      position: 'fixed',
      top: 0,
      zIndex: layers.navigation(),
    }}
    {...props}
  />
);

// Resizable Elements can be disabled

export type Resizable = {
  innerRef?: ElementRef<*>,
  disableInteraction: boolean,
};
export function applyDisabledProperties(disableInteraction?: boolean) {
  return disableInteraction
    ? {
        pointerEvents: 'none',
        userSelect: 'none',
      }
    : null;
}

// Content navigation

export const ContentNavigationWrapper = ({
  innerRef,
  disableInteraction,
  ...props
}: Resizable) => (
  <div
    ref={innerRef}
    css={{
      height: '100%',
      position: 'relative',
      ...applyDisabledProperties(disableInteraction),
    }}
    {...props}
  />
);
export const ContainerNavigationMask = ({
  disableInteraction,
  ...props
}: {
  disableInteraction?: boolean,
  [string]: any,
}) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      height: '100%',
      ...applyDisabledProperties(disableInteraction),
    }}
    {...props}
  />
);

// Page

type PageProps = Resizable & { offset: number };
export const PageWrapper = ({
  innerRef,
  disableInteraction,
  offset,
  ...props
}: PageProps) => (
  <div
    ref={innerRef}
    css={{
      flex: '1 1 auto',
      marginLeft: offset,
      width: 0, // fix flexbox growth to available width instead of 100%
      ...applyDisabledProperties(disableInteraction),
    }}
    {...props}
  />
);
