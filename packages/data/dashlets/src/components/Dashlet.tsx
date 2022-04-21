import React from 'react';
import { DashletProps } from '../types';
import CubeDashlet from './Adapters/CubeDashlet';
import DataDashlet from './Adapters/DataDashlet';
import GQLDashlet from './Adapters/GQLDashlet';

export default function Dashlet({
  dashlet,
  ...rest
}: {
  dashlet: DashletProps;
  component: React.ComponentType<any>;
  showHeader?: boolean;
  isCard?: boolean;
}) {
  if (dashlet.data) {
    return <DataDashlet dashlet={dashlet} {...rest} />;
  }
  if (dashlet.query) {
    return <CubeDashlet dashlet={dashlet} {...rest} />;
  }
  if (dashlet.gql) {
    return <GQLDashlet dashlet={dashlet} {...rest} />;
  }

  return null;
}
