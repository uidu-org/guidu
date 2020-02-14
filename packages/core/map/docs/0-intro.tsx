import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  Use lozenges to highlight an item's status for quick recognition. Use
  subtle lozenges by default and in instances where they may dominate the
  screen, such as in long tables.

  ## Usage

  ${code`import Map, { Marker, MarkerCluster } from '@uidu/map';`}

  ${(
    <Example
      packageName="@uidu/map"
      Component={require('../examples/0-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic').default}
      fullWidth
    />
  )}

  ${(
    <Example
      packageName="@uidu/map"
      Component={require('../examples/1-with-marker').default}
      title="With Marker"
      source={require('!!raw-loader!../examples/1-with-marker').default}
      fullWidth
    />
  )}

  ${(
    <Example
      packageName="@uidu/map"
      Component={require('../examples/2-with-cluster').default}
      title="With Marker Cluster"
      source={require('!!raw-loader!../examples/2-with-cluster').default}
      fullWidth
    />
  )}

  ${(
    <Example
      packageName="@uidu/map"
      Component={require('../examples/3-with-hover').default}
      title="With Hover"
      source={require('!!raw-loader!../examples/3-with-hover').default}
      fullWidth
    />
  )}

  ${(
    <Props
      props={
        require('!!extract-react-types-loader!../src/components/Map').default
      }
    />
  )}
`;
