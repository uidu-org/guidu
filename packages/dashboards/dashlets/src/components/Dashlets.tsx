import loadable from '@loadable/component';
import React, { PureComponent } from 'react';
import { DashletsProps } from '../types';
import Dashlet from './Dashlet';

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

export const renderBlock = ({ kind, ...block }, rowData, rest) => {
  let content = null;
  let showFooter = true;

  switch (kind) {
    case 'Area':
      content = LoadableArea;
      break;
    case 'Bar':
      content = LoadableBar;
      break;
    case 'Counter':
      content = LoadableCounter;
      showFooter = false;
      break;
    case 'Funnel':
      content = LoadableFunnel;
      break;
    case 'Geo':
      content = LoadableGeo;
      showFooter = false;
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
    case 'HorizontalRule':
      return <LoadableHorizontalRule />;
    case 'VerticalRule':
      return <LoadableVerticalRule />;
  }

  return (
    <Dashlet
      rowData={rowData}
      {...rest}
      block={block}
      isCard={block.isCard}
      component={content}
      showFooter={showFooter}
    />
  );
};

export default class Dashlets extends PureComponent<DashletsProps> {
  render() {
    const { blocks, rowData, ...rest } = this.props;
    return blocks.map(block => renderBlock(block, rowData, rest as any));
  }
}
