// @flow
import {
  name as packageName,
  version as packageVersion,
} from '../../../package.json';

export const hoveredPayload = {
  action: 'displayed',
  actionSubject: 'tooltip',

  attributes: {
    componentName: 'tooltip',
    packageName,
    packageVersion,
  },
};

export const unhoveredPayload = {
  action: 'hidden',
  actionSubject: 'tooltip',

  attributes: {
    componentName: 'tooltip',
    packageName,
    packageVersion,
  },
};
