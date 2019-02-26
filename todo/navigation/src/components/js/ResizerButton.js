// @flow
import React, { PureComponent } from 'react';
import ResizerButtonInner from '../styled/ResizerButtonInner';

type Props = {
  isPointingRight: boolean,
  isVisible: boolean,
  onClick?: () => void,
};

export default class ResizerButton extends PureComponent<Props> {
  static defaultProps = {
    isPointingRight: false,
    isVisible: false,
  };
  // Note: we always render the ResizerButtonInner here (instead of returning null immediately
  // when isVisible = false) because we want the user to be able to tab to the button always.
  render() {
    return (
      <ResizerButtonInner
        aria-expanded={!this.props.isPointingRight}
        isPointingRight={this.props.isPointingRight}
        onClick={this.props.onClick}
        isVisible={this.props.isVisible}
        onMouseDown={e => e.preventDefault()}
      />
    );
  }
}
