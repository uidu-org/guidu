import loadable from '@loadable/component';
import React from 'react';
import { DashletsProps } from '../types';
import Dashlet from './Dashlet';
import DashletGroup from './Dashlets/DashletGroup';

const LoadableCounter = loadable(() => import(`./Dashlets/Counter/Counter`));
const LoadableFunnel = loadable(() => import(`./Dashlets/Funnel/Funnel`));
const LoadableGeo = loadable(() => import(`./Dashlets/Geo/Geo`));
const LoadableTable = loadable(() => import(`./Dashlets/Table/Table`));
const LoadablePie = loadable(() => import(`./Dashlets/Pie/Pie`));
const LoadableRadar = loadable(() => import(`./Dashlets/Radar/Radar`));
const LoadableTreemap = loadable(() => import(`./Dashlets/Treemap/Treemap`));
const LoadableXY = loadable(() => import(`./Dashlets/XY/XY`));
const LoadableHorizontalRule = loadable(() =>
  import(`./Dashlets/HorizontalRule`),
);
const LoadableVerticalRule = loadable(() => import(`./Dashlets/VerticalRule`));

export function renderDashlet({ kind, showHeader = true, ...dashlet }) {
  let content = null;

  switch (kind) {
    case 'Area':
      content = LoadableXY;
      break;
    case 'Bar':
      content = LoadableXY;
      break;
    case 'Counter':
      content = LoadableCounter;
      break;
    case 'Funnel':
      content = LoadableFunnel;
      break;
    case 'Geo':
      content = LoadableGeo;
      showHeader = false;
      break;
    case 'List':
      content = LoadableTable;
      break;
    case 'Pie':
      content = LoadablePie;
      break;
    case 'Radar':
      content = LoadableRadar;
      break;
    case 'Table':
      content = LoadableTable;
      break;
    case 'Treemap':
      content = LoadableTreemap;
      break;
    case 'XY':
      content = LoadableXY;
      break;
    case 'DashletGroup':
      return (
        <DashletGroup
          showHeader={showHeader}
          dashlet={dashlet}
          dashlets={dashlet.dashlets}
          isCard={dashlet.isCard}
        />
      );
    case 'HorizontalRule':
      return <LoadableHorizontalRule />;
    case 'VerticalRule':
      return <LoadableVerticalRule />;
  }

  return (
    <Dashlet
      dashlet={dashlet}
      isCard={dashlet.isCard}
      component={content}
      showHeader={showHeader}
    />
  );
}

export default function Dashlets({ dashlets }: DashletsProps) {
  return dashlets.map((dashlet) => renderDashlet(dashlet));
}
