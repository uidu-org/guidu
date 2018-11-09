// @flow

import React, { Component } from 'react';

import { styleReducerNoOp, withContentTheme } from '../../../theme';
import ItemAvatar from './ItemAvatar';
import type { ConnectedItemAvatarProps } from './types';

const ItemAvatarWithTheme = withContentTheme(ItemAvatar);

export default class ConnectedItemAvatar extends Component<
  ConnectedItemAvatarProps,
> {
  static defaultProps = {
    styles: styleReducerNoOp,
  };

  render() {
    return <ItemAvatarWithTheme {...this.props} />;
  }
}
