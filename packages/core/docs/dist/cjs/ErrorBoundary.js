function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
export default class ErrorBoundary extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      hasError: false
    });
  }

  componentDidCatch(error, info) {
    const onError = this.props.onError;
    this.setState({
      hasError: true
    });

    if (onError) {
      onError(error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return React.createElement("h4", null, "Something went wrong loading this example.");
    }

    return this.props.children;
  }

}