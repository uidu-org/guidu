// @flow

import { Component, type Element } from 'react';
import PropTypes from 'prop-types';
import { clickManagerContext } from '../../util/contextNamespace';

type Props = {
  children?: Element<any>,
  onItemClicked: (
    event: SyntheticMouseEvent<any> | SyntheticKeyboardEvent<any>,
  ) => void,
};

export default class DropdownItemClickManager extends Component<Props> {
  static childContextTypes = {
    [clickManagerContext]: PropTypes.object,
  };

  getChildContext() {
    return {
      [clickManagerContext]: {
        itemClicked: this.handleItemClicked,
      },
    };
  }

  handleItemClicked = (
    event: SyntheticMouseEvent<any> | SyntheticKeyboardEvent<any>,
  ) => {
    this.props.onItemClicked(event);
  };

  render() {
    return this.props.children;
  }
}
