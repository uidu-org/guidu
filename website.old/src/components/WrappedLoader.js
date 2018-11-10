import Loadable from 'react-loadable';
import React, { Component } from 'react';

function checkMarkAndSendAnalytics() {
  if (!performance.mark) {
    return null;
  }

  // We mark before doing anything because speed matters here
  performance.mark('loaded');
  let [navigate, loaded] = performance
    .getEntriesByType('mark')
    .filter(
      match => match.name.includes('navigate-') || match.name === 'loaded',
    );

  if (navigate && loaded) {
    performance.measure('analytics-measure', navigate.name, 'loaded');

    let entries = performance.getEntriesByName('analytics-measure', 'measure');
  }

  performance.clearMarks();
  performance.clearMeasures();
  return null;
}

class Wrapper extends Component {
  componentDidMount() {
    // checkMarkAndSendAnalytics();
  }
  render() {
    return this.props.children;
  }
}
const WrappedLoadable = ({ render, ...rest }) =>
  Loadable({
    ...rest,
    render: args => <Wrapper>{render(args)}</Wrapper>,
  });

export default WrappedLoadable;
