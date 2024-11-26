import {
  faH1,
  faH2,
  faH3,
  faH4,
  faH5,
  faH6,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadable from '@loadable/component';
import React from 'react';
import { HeadingLevels } from '../../block-type/types';
import { IconProps } from '../types';

export const IconAction = loadable(() => import('./action'));
export const IconFeedback = loadable(() => import('./feedback'));
export const IconDecision = loadable(() => import('./decision'));
export const IconDivider = loadable(() => import('./divider'));
export const IconExpand = loadable(() => import('./expand'));
export const IconPanelError = loadable(() => import('./panel-error'));
export const IconPanelNote = loadable(() => import('./panel-note'));
export const IconPanelSuccess = loadable(() => import('./panel-success'));
export const IconPanelWarning = loadable(() => import('./panel-warning'));
export const IconPanel = loadable(() => import('./panel'));
export const IconFallback = loadable(() => import('./fallback'));

type HeadingProps = IconProps & {
  level: HeadingLevels;
};

export function IconHeading({ level, ...props }: HeadingProps) {
  switch (level) {
    case 1:
      return <FontAwesomeIcon icon={faH1} {...props} />;
    case 2:
      return <FontAwesomeIcon icon={faH2} {...props} />;
    case 3:
      return <FontAwesomeIcon icon={faH3} {...props} />;
    case 4:
      return <FontAwesomeIcon icon={faH4} {...props} />;
    case 5:
      return <FontAwesomeIcon icon={faH5} {...props} />;
    default:
      return <FontAwesomeIcon icon={faH6} {...props} />;
  }
}
