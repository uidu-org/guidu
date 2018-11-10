// @flow

import type { ItemBaseProps as PresentationalItemProps } from '../../presentational/Item/types';

export type ConnectedItemProps = {
  ...PresentationalItemProps,
  /** See 'after' prop of presentational Item. */
  after?: $PropertyType<PresentationalItemProps, 'after'> | null,
  /** Deprecated: Do not use. */
  icon?: string,
  /** The view ID that should be transitioned to onClick. */
  goTo?: string,
};
