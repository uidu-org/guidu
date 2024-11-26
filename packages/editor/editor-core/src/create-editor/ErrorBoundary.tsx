import React from 'react';

export type ErrorBoundaryProps = {
  rethrow?: boolean;
  children: React.ReactNode;
};

export type ErrorBoundaryState = {
  error?: Error;
};

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static defaultProps = {
    rethrow: true,
  };

  state = {
    error: undefined,
  };

  private getProductName = async () => {
    return 'uidu';
  };

  componentDidCatch(error: Error) {
    // Update state to allow a re-render to attempt graceful recovery (in the event that
    // the error was caused by a race condition or is intermittent)
    this.setState({ error }, () => {
      if (this.props.rethrow) {
        // Now that a re-render has occured, we re-throw to allow product error boundaries
        // to catch and handle the error too.
        //
        // Note that when rethrowing inside a error boundary, the stack trace
        // from a higher error boundary's componentDidCatch.info param will reset
        // to this component, instead of the original component which threw it.
        throw error;
      }
    });
  }

  render() {
    return this.props.children;
  }
}
