import loadable from '@loadable/component';
import React from 'react';
import { DashletProps, DashletsProps } from '../types';
import Dashlet from './Dashlet';
import DashletGroup from './DashletGroup';

const LoadableCounter = loadable(() => import(`../dashlets/Counter/Counter`));
const LoadableFunnel = loadable(() => import(`../dashlets/Funnel/Funnel`));
const LoadableGeo = loadable(() => import(`../dashlets/Geo/Geo`));
const LoadableTable = loadable(() => import(`../dashlets/Table/Table`));
const LoadablePie = loadable(() => import(`../dashlets/Pie/Pie`));
const LoadableRadar = loadable(() => import(`../dashlets/Radar/Radar`));
const LoadableTreemap = loadable(() => import(`../dashlets/Treemap/Treemap`));
const LoadableXY = loadable(() => import(`../dashlets/XY/XY`));
const LoadableHorizontalRule = loadable(
  () => import(`../dashlets/HorizontalRule`),
);
const LoadableVerticalRule = loadable(() => import(`../dashlets/VerticalRule`));

export function renderDashlet(
  {
    kind,
    showHeader = true,
    ...dashlet
  }: DashletProps & { showHeader?: DashletsProps['showHeader'] },
  index: number,
) {
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
      showHeader = false;
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
    case 'InlineComponent':
      content = dashlet.component;
      showHeader = false;
      break;
    default:
      return null;
  }

  return (
    <Dashlet
      key={index}
      dashlet={dashlet}
      isCard={dashlet.isCard}
      component={content}
      showHeader={showHeader}
    />
  );
}

export default function Dashlets({ dashlets }: DashletsProps) {
  return dashlets.map(renderDashlet);
}
