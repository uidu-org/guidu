// @flow
import { type ComponentType } from 'react';

export function omit(obj: {}, ...keysToOmit: Array<string>) {
  const newObj = { ...obj };

  for (const key of keysToOmit) {
    delete newObj[key];
  }
  return newObj;
}

export function getDisplayName(prefix: string, Component: ComponentType<*>) {
  const componentName: string = Component.displayName || Component.name;

  return componentName ? `${prefix}(${componentName})` : prefix;
}
