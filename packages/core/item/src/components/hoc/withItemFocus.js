// @flow

import React, { Component, type Node } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import uuid from 'uuid';

import getDisplayName from '../../util/getDisplayName';
import safeContextCall from '../../util/safeContextCall';
import { focusManagerContext } from '../../util/contextNamespace';
import type { ItemId } from '../../types';

// HOC that typically wraps @uidu/item

type Props = {
  /** Content to be displayed inside the item. Same as @uidu/item `children` prop. */
  children?: Node,
  /** If true, the item appears greyed out and does not fire click events. */
  isDisabled?: boolean,
  /** If true, the item is mounted but not rendered. */
  isHidden?: boolean,
};

const withItemFocus = (WrappedComponent: any) =>
  class WithItemFocus extends Component<Props> {
    static displayName = `WithItemFocus(${getDisplayName(WrappedComponent)})`;

    static contextTypes = {
      [focusManagerContext]: PropTypes.object,
    };

    contextId: ItemId;

    componentDidMount() {
      if (!this.isFocusable()) {
        return;
      }

      this.contextId = uuid();

      this.callContextFn(
        'registerItem',
        this.contextId,
        ReactDOM.findDOMNode(this), // eslint-disable-line react/no-find-dom-node
      );
    }

    componentDidUpdate() {
      if (!this.isFocusable()) {
        return;
      }

      this.callContextFn(
        'updateItem',
        this.contextId,
        ReactDOM.findDOMNode(this), // eslint-disable-line react/no-find-dom-node
      );
    }

    componentWillUnmount() {
      if (this.isFocusable()) {
        this.callContextFn('deregisterItem', this.contextId);
      }
    }

    callContextFn = safeContextCall(this, focusManagerContext);

    isFocusable = () => !this.props.isDisabled && !this.props.isHidden;

    handleFocus = () => {
      if (this.isFocusable()) {
        this.callContextFn('itemFocused', this.contextId);
      }
    };

    render() {
      const { children, ...otherProps } = this.props;

      return (
        <WrappedComponent
          onFocus={this.handleFocus}
          role="menuitem"
          {...otherProps}
        >
          {children}
        </WrappedComponent>
      );
    }
  };

export default withItemFocus;
