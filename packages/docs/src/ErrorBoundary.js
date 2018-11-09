// @flow

import React, { Component, type Node } from 'react';

type Props = {
  children: Node,
  onError?: (error: Error, info: any) => void,
};

type State = {
  hasError: boolean,
};

export default class ErrorBoundary extends Component<Props, State> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: Error, info: any) {
    const { onError } = this.props;
    this.setState({ hasError: true });
    if (onError) {
      onError(error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return <h4>Something went wrong loading this example.</h4>;
    }
    return this.props.children;
  }
}
