import loadable from '@loadable/component';
import React from 'react';
import { HeadingLevels } from '../../block-type/types';
import { IconProps } from '../types';

export const IconAction = loadable(() => import('./action'));
export const IconCode = loadable(() => import('./code'));
export const IconDate = loadable(() => import('./date'));
export const IconDecision = loadable(() => import('./decision'));
export const IconDivider = loadable(() => import('./divider'));
export const IconEmoji = loadable(() => import('./emoji'));
export const IconExpand = loadable(() => import('./expand'));
export const IconImages = loadable(() => import('./images'));
export const IconLayout = loadable(() => import('./layout'));
export const IconLink = loadable(() => import('./link'));
export const IconListNumber = loadable(() => import('./list-number'));
export const IconList = loadable(() => import('./list'));
export const IconMention = loadable(() => import('./mention'));
export const IconPanelError = loadable(() => import('./panel-error'));
export const IconPanelNote = loadable(() => import('./panel-note'));
export const IconPanelSuccess = loadable(() => import('./panel-success'));
export const IconPanelWarning = loadable(() => import('./panel-warning'));
export const IconPanel = loadable(() => import('./panel'));
export const IconQuote = loadable(() => import('./quote'));
export const IconStatus = loadable(() => import('./status'));
export const IconTable = loadable(() => import('./table'));
export const IconFallback = loadable(() => import('./fallback'));

type HeadingProps = IconProps & {
  level: HeadingLevels;
};

const Heading1 = loadable(() => import(`./heading1`));
const Heading2 = loadable(() => import(`./heading2`));
const Heading3 = loadable(() => import(`./heading3`));
const Heading4 = loadable(() => import(`./heading4`));
const Heading5 = loadable(() => import(`./heading5`));
const Heading6 = loadable(() => import(`./heading6`));

export const IconHeading = ({ level, ...props }: HeadingProps) => {
  switch (level) {
    case 1:
      return <Heading1 {...props} />;
    case 2:
      return <Heading2 {...props} />;
    case 3:
      return <Heading3 {...props} />;
    case 4:
      return <Heading4 {...props} />;
    case 5:
      return <Heading5 {...props} />;
    default:
      return <Heading6 {...props} />;
  }
};

export const IconFeedback = loadable(() => import('./feedback'));
