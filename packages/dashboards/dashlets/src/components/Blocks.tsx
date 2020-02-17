import loadable from '@loadable/component';
import React, { PureComponent } from 'react';
import { BlocksProps } from '../types';

// const LoadableBlock = loadable(props => import(`./${props.kind}`));

const LoadableArea = loadable(() => import(`./Area`));
const LoadableBar = loadable(() => import(`./Bar`));
const LoadableCounter = loadable(() => import(`./Counter`));
const LoadableFunnel = loadable(() => import(`./Funnel`));
const LoadableGeo = loadable(() => import(`./Geo`));
const LoadableList = loadable(() => import(`./List`));
const LoadablePie = loadable(() => import(`./Pie`));
const LoadableRadial = loadable(() => import(`./Radial`));
const LoadableTreemap = loadable(() => import(`./Treemap`));

export const renderBlock = ({ kind, ...block }, rowData, rest) => {
  console.log(kind);
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
  // return (
  //   <LoadableBlock
  //     kind={kind}
  //     rowData={rowData}
  //     comparatorData={comparatorData}
  //     namespace={namespace}
  //     {...rest}
  //     {...otherProps}
  //   />
  // );
};

export default class Blocks extends PureComponent<BlocksProps> {
  render() {
    const { blocks, rowData, ...rest } = this.props;
    return blocks.map(block => renderBlock(block, rowData, rest as any));
  }
}
