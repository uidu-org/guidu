// @flow

import type { AnalyticsEventInterface } from '@uidu/analytics';
import type { ThemeProp } from '@uidu/theme';
import type { Node, ComponentType } from 'react';
import type { ThemeProps, ThemeTokens } from './theme';

export type AccordionClickType = (
  ?{ event?: KeyboardEvent | MouseEvent, item: Object },
  ?AnalyticsEventInterface,
) => void;

export type AccordionPropTypesBase = {
  /** Open only one item at a time or not */
  allowMultipleExpanded?: boolean,
  /** Allow accordion to close on click */
  allowZeroExpanded?: boolean,
  /** Open only one item at a time or not */
  items: Array,
  /** Open only one item at a time or not */
  onChange?: (name: string, value: boolean) => mixed,
  /** Display a tooltip on hover */
  enableTooltip: boolean,
  /** Assign specific tabIndex order to the underlying node. */
  tabIndex?: number,
  /** You should not be accessing this prop under any circumstances. It is
   provided by @uidu/analytics. */
  createAnalyticsEvent?: any,
  /** The theme that should be applied to the avatar. */
  theme?: ThemeProp<ThemeTokens, ThemeProps>,
};

export type AccordionPropTypes = AccordionPropTypesBase & {
  /** Handler to be called on click. */
  onClick?: AccordionClickType,
};
