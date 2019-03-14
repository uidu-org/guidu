// @flow
import React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`
  Use lozenges to highlight an item's status for quick recognition. Use
  subtle lozenges by default and in instances where they may dominate the
  screen, such as in long tables.

  ## Usage

  ${code`import Map, { Marker, MarkerCluster } from '@uidu/map';`}

  ${(
    <Example
      packageName="@uidu/map"
      Component={require('../examples/0-basic')}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic')}
    />
  )}

  ${(
    <Example
      packageName="@uidu/map"
      Component={require('../examples/1-with-marker')}
      title="With Marker"
      source={require('!!raw-loader!../examples/1-with-marker')}
    />
  )}

  ${(
    <Example
      packageName="@uidu/map"
      Component={require('../examples/2-with-cluster')}
      title="With Marker Cluster"
      source={require('!!raw-loader!../examples/2-with-cluster')}
    />
  )}

  ${<Props props={require('!!extract-react-types-loader!../src/Map')} />}
`;
