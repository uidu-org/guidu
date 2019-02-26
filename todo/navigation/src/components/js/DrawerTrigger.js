// @flow
import React, { PureComponent, type Node } from 'react';
import GlobalItem from './GlobalItem';
import DrawerTriggerInner from '../styled/DrawerTriggerInner';

type Props = {
  children?: Node,
  onActivate: (
    event: SyntheticMouseEvent<*> | SyntheticKeyboardEvent<*>,
  ) => void,
};

export default class DrawerTrigger extends PureComponent<Props> {
  static defaultProps = {
    onActivate: () => {},
  };

  render() {
    if (this.props.children == null) return null;
    return (
      <DrawerTriggerInner>
        <GlobalItem
          role="button"
          aria-haspopup="true"
          onClick={this.props.onActivate}
          onMouseDown={e => e.preventDefault()}
          size="medium"
        >
          {this.props.children}
        </GlobalItem>
      </DrawerTriggerInner>
    );
  }
}
