/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { v1 as uuid } from 'uuid';
import { focusManagerContext } from '../../util/contextNamespace';
import getDisplayName from '../../util/getDisplayName';
import safeContextCall from '../../util/safeContextCall';

// HOC that typically wraps @uidu/item

const withItemFocus = (WrappedComponent) =>
  class WithItemFocus extends Component<any> {
    static displayName = `WithItemFocus(${getDisplayName(WrappedComponent)})`;

    static contextTypes = {
      [focusManagerContext]: PropTypes.object,
    };

    contextId;

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
