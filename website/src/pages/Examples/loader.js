// @flow
import React, { Component, type ComponentType } from 'react';
import { isValidElementType } from 'react-is';
import styled from 'styled-components';
import FabricAnalyticsListeners from '@atlaskit/analytics-listeners';
import { colors, gridSize } from '@atlaskit/theme';
import Loadable from '../../components/WrappedLoader';
import qs from 'query-string';

import packageResolver from '../../utils/packageResolver';
import * as fs from '../../utils/fs';
import type { File } from '../../types';
import Loading from '../../components/Loading';
import {
  sendApdex,
  sendInitialApdex,
  initializeGA,
  observePerformanceMetrics,
} from '../../components/Analytics/GoogleAnalyticsListener';

const ErrorMessage = styled.div`
  background-color: ${colors.R400};
  color: white;
  font-size: 120%;
  padding: 1em;
`;

type State = {
  packageId: string,
  groupId: string,
  exampleId: string,
};

type ExampleLoaderProps = {
  example: File,
};

export default class ExamplesIFrame extends Component<{}, State> {
  state = {
    packageId: '',
    groupId: '',
    exampleId: '',
  };
  componentWillMount() {
    if (window) {
      const { packageId, groupId, exampleId } = qs.parse(
        window.location.search,
      );
      this.setState({
        packageId,
        groupId,
        exampleId,
      });
    }
  }

  componentDidMount() {
    if (window.self === window.top) {
      const location = window.location.pathname + window.location.search;
      window.addEventListener(
        'load',
        () => {
          sendInitialApdex(location);
        },
        { once: true },
      );
      observePerformanceMetrics(location);
    }
    initializeGA();
  }

  render() {
    const { examples, packageId, exampleId } = packageResolver(
      this.state.groupId,
      this.state.packageId,
      this.state.exampleId,
    );
    if (examples && exampleId) {
      return (
        <ExampleLoader
          example={fs.getById(fs.getFiles(examples.children), exampleId)}
        />
      );
    }

    return (
      <ErrorMessage>
        {fs.titleize(packageId)} does not have examples
      </ErrorMessage>
    );
  }
}

// Using console.debug instead of console.log to reduce noise.
// Chrome's default logging level excludes debug
const mockClient = {
  sendUIEvent: (...args) => console.debug('UI event', ...args),
  sendOperationalEvent: (...args) =>
    console.debug('Operational event', ...args),
  sendTrackEvent: (...args) => console.debug('Track event', ...args),
  sendScreenEvent: (...args) => console.debug('Screen event', ...args),
};

type Metadata = {
  meta?: {
    noListener?: boolean,
  },
};

type Example = {
  default: ComponentType<any> & Metadata,
};

function ExampleLoader(props: ExampleLoaderProps) {
  const ExampleComponent = Loadable({
    loader: () => props.example.exports(),
    loading: Loading,
    render(loaded: Example) {
      const ExampleComp = loaded.default;
      if (!ExampleComp) {
        return (
          <ErrorMessage>
            Example "{props.example.id}" doesn't have default export.
          </ErrorMessage>
        );
      }

      const meta = ExampleComp.meta || {};

      return meta.noListener ? (
        <ExampleComp />
      ) : (
        <FabricAnalyticsListeners client={mockClient}>
          <ExampleComp />
        </FabricAnalyticsListeners>
      );
    },
  });

  return <ExampleComponent />;
}
