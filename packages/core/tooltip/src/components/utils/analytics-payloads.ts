import pkg from '../../version.json';

export const hoveredPayload = {
  action: 'displayed',
  actionSubject: 'tooltip',

  attributes: {
    componentName: 'tooltip',
    packageName: pkg.name,
    packageVersion: pkg.version,
  },
};

export const unhoveredPayload = {
  action: 'hidden',
  actionSubject: 'tooltip',

  attributes: {
    componentName: 'tooltip',
    packageName: pkg.name,
    packageVersion: pkg.version,
  },
};
