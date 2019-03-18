import * as React from 'react';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router-dom';
import ttiPolyfill from 'tti-polyfill';
import { getAtlassianAnalyticsClient } from './AtlassianAnalytics';
import { GOOGLE_ANALYTICS_ID } from '../../constants';
import { Window } from '../../types';

let mounted = 0;

export type PerformanceMetrictsOpts = {
  location: string;
  metricName: string;
  timing: number;
  value: number;
  isInitial: boolean;
};

export const getPageLoadNumber = () => {
  if (!window || !window.performance || !window.performance.getEntriesByType) {
    return null;
  }

  let navigationEntries = window.performance.getEntriesByType(
    'navigation',
  ) as Array<PerformanceNavigationTiming>;
  if (navigationEntries.length !== 1) return null;

  return Math.round(navigationEntries[0].domComplete);
};

export const initializeGA = () => ReactGA.initialize(GOOGLE_ANALYTICS_ID);

export const sendPerformanceMetrics = (opts: PerformanceMetrictsOpts) => {
  ReactGA.event({
    category: 'Performance',
    action: opts.metricName,
    value: opts.value,
    nonInteraction: true,
    label: `seconds:${(opts.timing / 1000).toFixed(1)}`,
  });

  const request = getAtlassianAnalyticsClient({
    version: '-',
  });
  const attributes = {
    [opts.metricName]: opts.value,
    loadTimeInMs: opts.timing,
    path: opts.location,
    isInitial: opts.isInitial || false,
  };
  request.addEvent(`atlaskit.website.performance`, attributes);
  request.send();
};

export const sendApdex = (
  location: string,
  timing: number,
  isInitial = false,
) => {
  let apdex = 0;
  if (timing < 1000) apdex = 100;
  else if (timing < 4000) apdex = 50;
  sendPerformanceMetrics({
    location,
    timing,
    metricName: 'apdex',
    value: apdex,
    isInitial,
  });
};

export const sendInitialApdex = (location: string) => {
  const timing = getPageLoadNumber();
  if (!timing) return null;
  sendApdex(location, timing, true);
};

export const observePerformanceMetrics = (location: string) => {
  if (typeof PerformanceObserver === 'undefined') {
    return;
  }

  // 'first-paint' and 'first-contentful-paint'
  const observer = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      const metricName = entry.name;
      const timing = Math.round(entry.startTime + entry.duration);
      sendPerformanceMetrics({
        location,
        timing,
        metricName,
        value: timing,
        isInitial: true,
      });
    }
  });
  // TODO: remove this once fixed in Firefox (most likely FF63)
  // https://ecosystem.atlassian.net/browse/AK-5381
  try {
    observer.observe({ entryTypes: ['paint'] });
  } catch (error) {}

  // time to interactive, more details: https://goo.gl/OSmrPk
  ttiPolyfill
    .getFirstConsistentlyInteractive({ useMutationObserver: false })
    .then(tti => {
      const timing = Math.round(tti);
      sendPerformanceMetrics({
        location,
        timing,
        metricName: 'tti',
        value: timing,
        isInitial: true,
      });
    });
};

export type Props = {
  gaId: string;
  children: React.ReactChild;
  location: Window['location'];
};

class GoogleAnalyticsListener extends React.Component<Props> {
  constructor(props) {
    super(props);
    ReactGA.initialize(GOOGLE_ANALYTICS_ID);
  }

  componentDidMount() {
    window.addEventListener(
      'load',
      () => {
        sendInitialApdex(this.props.location.pathname);
      },
      { once: true },
    );
    observePerformanceMetrics(this.props.location.pathname);

    mounted++;
    if (mounted > 1) {
      console.warn(
        'There is more than one GoogleAnalyticsListener on the page, this could cause errors',
      );
    }
    initializeGA();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.gaId !== this.props.gaId) {
      console.warn("You can't change the gaId one it has been initialised.");
    }
    if (nextProps.location !== this.props.location) {
      ReactGA.pageview(nextProps.location.pathname);
    }
  }
  componentWillUnmount() {
    mounted--;
  }
  render() {
    return this.props.children;
  }
}

export default withRouter(GoogleAnalyticsListener);
