import React from 'react';
import CubeDashlet from '../adapters/CubeDashlet';
import DataDashlet from '../adapters/DataDashlet';
import GQLDashlet from '../adapters/GQLDashlet';
import { DashletProps } from '../types';

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
