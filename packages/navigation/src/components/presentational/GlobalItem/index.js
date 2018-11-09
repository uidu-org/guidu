// @flow

import React, { PureComponent } from 'react';

import { navigationItemClicked } from '../../../common/analytics';
import InteractionStateManager from '../InteractionStateManager';
import type { InteractionState } from '../InteractionStateManager/types';
import { styleReducerNoOp, withGlobalTheme } from '../../../theme';
import GlobalItemPrimitive from './primitives';
import type { GlobalItemProps } from './types';

export class GlobalItemBase extends PureComponent<GlobalItemProps> {
  static defaultProps = {
    label: '',
    size: 'large',
    styles: styleReducerNoOp,
  };
  renderItem = (state: InteractionState) => (
    <GlobalItemPrimitive {...state} {...this.props} />
  );

  render() {
    const {
      size,
      theme: { mode },
    } = this.props;
    const { itemWrapper: itemWrapperStyles } = styleReducerNoOp(
      mode.globalItem({ size }),
    );
    return (
      <div css={itemWrapperStyles}>
        <InteractionStateManager>{this.renderItem}</InteractionStateManager>
      </div>
    );
  }
}

export default navigationItemClicked(
  withGlobalTheme(GlobalItemBase),
  'globalItem',
  true,
);

export type { GlobalItemProps };
