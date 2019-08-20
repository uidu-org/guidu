// @flow
// We currently need to keep the dropdown open if an item with `href` is clicked, to avoid the
// analytics package to track the href value without the event target disappearing. Without this
// requirement, we could just use a native click event all the way up to DropdownMenuStateless,
// and could get rid of this HOC and DropdownItemClickManager.

import PropTypes from 'prop-types';
import React, { Component, ComponentType, Node } from 'react';
import { clickManagerContext } from '../../util/contextNamespace';
import getDisplayName from '../../util/getDisplayName';
import safeContextCall from '../../util/safeContextCall';

type Props = {
  /** Content to be displayed inside the item. Same as @uidu/item `children` prop. */
  children?: Node,
  /** If true, the item appears greyed out and does not fire click events. */
  isDisabled?: boolean,
  /** If true, the item appears greyed out and does not fire click events. */
  href?: string,
  /** Standard onClick handler */
  onClick: Function,
  /** Standard onKeyDown handler */
  onKeyDown?: Function,
};

// HOC that typically wraps @uidu/item
const withItemClick = (WrappedItem: ComponentType<any>) =>
  class WithItemClick extends Component<Props> {
    static displayName = `WithItemClick(${getDisplayName(WrappedItem)})`;

    static defaultProps = {
      onClick: () => {},
    };

    static contextTypes = {
      [clickManagerContext]: PropTypes.object,
    };

    callContextFn = safeContextCall(this, clickManagerContext);

    shouldCloseAfterClick = () => !this.props.isDisabled && !this.props.href;

    handleClick = (event: MouseEvent | KeyboardEvent) => {
      this.props.onClick(event);
      if (this.shouldCloseAfterClick()) {
        this.callContextFn('itemClicked');
      }
    };

    handleKeyDown = (event: KeyboardEvent) => {
      if (this.props.onKeyDown) {
        this.props.onKeyDown(event);
      } else if (event.key === 'Space' || event.key === 'Enter') {
        this.handleClick(event);
      }
    };

    render() {
      const { children, ...otherProps } = this.props;

      return (
        <WrappedItem
          {...otherProps}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          {children}
        </WrappedItem>
      );
    }
  };

export default withItemClick;
