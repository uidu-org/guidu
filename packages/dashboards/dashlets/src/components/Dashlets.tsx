import loadable from '@loadable/component';
import React, { PureComponent } from 'react';
import { DashletsProps } from '../types';
import Dashlet from './Dashlet';
import DashletGroup from './Dashlets/DashletGroup';

const LoadableArea = loadable(() => import(`./Dashlets/Area`));
const LoadableBar = loadable(() => import(`./Dashlets/Bar`));
const LoadableCounter = loadable(() => import(`./Dashlets/Counter`));
const LoadableFunnel = loadable(() => import(`./Dashlets/Funnel`));
const LoadableGeo = loadable(() => import(`./Dashlets/Geo`));
const LoadableList = loadable(() => import(`./Dashlets/List`));
const LoadablePie = loadable(() => import(`./Dashlets/Pie`));
const LoadableRadial = loadable(() => import(`./Dashlets/Radial`));
const LoadableTreemap = loadable(() => import(`./Dashlets/Treemap`));
const LoadableHorizontalRule = loadable(() =>
  import(`./Dashlets/HorizontalRule`),
);
const LoadableVerticalRule = loadable(() => import(`./Dashlets/VerticalRule`));

export const renderDashlet = ({ kind, ...dashlet }) => {
  let content = null;
  let showHeader = true;

  switch (kind) {
    case 'Area':
      content = LoadableArea;
      break;
    case 'Bar':
      content = LoadableBar;
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
      content = LoadableList;
      break;
    case 'Pie':
      content = LoadablePie;
      break;
    case 'Radial':
      content = LoadableRadial;
      break;
    case 'Treemap':
      content = LoadableTreemap;
      break;
    case 'DashletGroup':
      return (
        <DashletGroup
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
};

export default class Dashlets extends PureComponent<DashletsProps> {
  render() {
    const { dashlets } = this.props;
    return dashlets.map((dashlet) => renderDashlet(dashlet));
  }
}
