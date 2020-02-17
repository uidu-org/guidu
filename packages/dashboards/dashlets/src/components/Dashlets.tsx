import loadable from '@loadable/component';
import React, { PureComponent } from 'react';
import { DashletsProps } from '../types';
import DashletFooter from './DashletFooter';
import DashletHeader from './DashletHeader';

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
  let content = null;

  switch (kind) {
    case 'Area':
      content = <LoadableArea {...block} rowData={rowData} {...rest} />;
      break;
    case 'Bar':
      content = <LoadableBar {...block} rowData={rowData} {...rest} />;
      break;
    case 'Counter':
      content = <LoadableCounter {...block} rowData={rowData} {...rest} />;
      break;
    case 'Funnel':
      content = <LoadableFunnel {...block} rowData={rowData} {...rest} />;
      break;
    case 'Geo':
      content = <LoadableGeo {...block} rowData={rowData} {...rest} />;
      break;
    case 'List':
      content = <LoadableList {...block} rowData={rowData} {...rest} />;
      break;
    case 'Pie':
      content = <LoadablePie {...block} rowData={rowData} {...rest} />;
      break;
    case 'Radial':
      content = <LoadableRadial {...block} rowData={rowData} {...rest} />;
      break;
    case 'Treemap':
      content = <LoadableTreemap {...block} rowData={rowData} {...rest} />;
      break;
  }

  console.log(content);

  return (
    <div className="card h-100">
      <DashletHeader name={block.label} description={block.description} />
      {content}
      <DashletFooter />
    </div>
  );
};

export default class Dashlets extends PureComponent<DashletsProps> {
  render() {
    const { blocks, rowData, ...rest } = this.props;
    return blocks.map(block => (
      <div className="card h-100">
        <DashletHeader name={block.label} />
        {renderBlock(block, rowData, rest as any)}
        <DashletFooter />
      </div>
    ));
  }
}
