// @flow

import type { ComponentType } from 'react';
import type { ExternalGlobalItemProps } from '../GlobalItem/types';
import type { GlobalTheme } from '../../../theme/types';

type ItemDataShape = ExternalGlobalItemProps & { key?: string };

export type ConnectedGlobalNavigationProps = {
  /** The component used to render the `primaryItems` and `secondaryItems`. By
   * default this will render a `GlobalItem`. */
  itemComponent: ComponentType<*>,
  /** An array of objects to render as GlobalItems at the top of the GlobalNavigation
   * bar.
   * Note: The `key` prop is deprecated, the `id` prop should be used instead. */
  primaryItems: ItemDataShape[],
  /** An array of objects to render as GlobalItems at the bottom of the
   * GlobalNavigation bar.
   * Note: The `key` prop is deprecated, the `id` prop should be used instead. */
  secondaryItems: ItemDataShape[],
};

export type GlobalNavigationProps = GlobalNavigationProps & {
  theme: GlobalTheme,
};
