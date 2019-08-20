export function omit(obj: {}, ...keysToOmit: Array<string>) {
  const newObj = { ...obj };

  for (const key of keysToOmit) {
    delete newObj[key];
  }
  return newObj;
}

export function getDisplayName(prefix: string, Component: any) {
  const componentName: string = Component.displayName || Component.name;

  return componentName ? `${prefix}(${componentName})` : prefix;
}
