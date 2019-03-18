import * as React from 'react';
import Loadable from 'react-loadable';
import { sendApdex } from './Analytics/GoogleAnalyticsListener';

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
    if (entries.length === 1 && entries[0].duration) {
      sendApdex(
        navigate.name.replace('navigate-', ''),
        Math.round(entries[0].duration),
      );
    }
  }

  performance.clearMarks();
  performance.clearMeasures();
  return null;
}

class Wrapper extends React.Component {
  componentDidMount() {
    checkMarkAndSendAnalytics();
  }
  render() {
    return this.props.children;
  }
}

const WrappedLoadable = <Props2, Exports extends object>({
  render,
  ...rest
}: Loadable.OptionsWithRender<Props2, Exports>) =>
  Loadable({
    ...rest,
    render: (loaded: Exports, props: Props2) => (
      <Wrapper>{render(loaded, props)}</Wrapper>
    ),
  });

export default WrappedLoadable;
