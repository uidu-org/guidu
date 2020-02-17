import loadable from '@loadable/component';
import React, { PureComponent } from 'react';
import { DashletsProps } from '../types';

const LoadableArea = loadable(() => import(`./Dashlets/Area`));
const LoadableBar = loadable(() => import(`./Dashlets/Bar`));
const LoadableCounter = loadable(() => import(`./Dashlets/Counter`));
const LoadableFunnel = loadable(() => import(`./Dashlets/Funnel`));
const LoadableGeo = loadable(() => import(`./Dashlets/Geo`));
const LoadableList = loadable(() => import(`./Dashlets/List`));
const LoadablePie = loadable(() => import(`./Dashlets/Pie`));
const LoadableRadial = loadable(() => import(`./Dashlets/Radial`));
const LoadableTreemap = loadable(() => import(`./Dashlets/Treemap`));

export const renderBlock = ({ kind, ...block }, rowData, rest) => {
  switch (kind) {
    case 'Area':
      return <LoadableArea {...block} rowData={rowData} {...rest} />;
    case 'Bar':
      return <LoadableBar {...block} rowData={rowData} {...rest} />;
    case 'Counter':
      return <LoadableCounter {...block} rowData={rowData} {...rest} />;
    case 'Funnel':
      return <LoadableFunnel {...block} rowData={rowData} {...rest} />;
    case 'Geo':
      return <LoadableGeo {...block} rowData={rowData} {...rest} />;
    case 'List':
      return <LoadableList {...block} rowData={rowData} {...rest} />;
    case 'Pie':
      return <LoadablePie {...block} rowData={rowData} {...rest} />;
    case 'Radial':
      return <LoadableRadial {...block} rowData={rowData} {...rest} />;
    case 'Treemap':
      return <LoadableTreemap {...block} rowData={rowData} {...rest} />;
    default:
      return null;
  }
};

export default class Dashlets extends PureComponent<DashletsProps> {
  render() {
    const { blocks, rowData, ...rest } = this.props;
    return blocks.map(block => renderBlock(block, rowData, rest as any));
  }
}
