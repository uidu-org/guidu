import loadable from '@loadable/component';
import React, { PureComponent } from 'react';

const LoadableArea = loadable(() => import('./Area'));
const LoadableBar = loadable(() => import('./Bar'));
const LoadableCounter = loadable(() => import('./Counter'));
const LoadableFunnel = loadable(() => import('./Funnel'));
const LoadableGeo = loadable(() => import('./Geo'));
const LoadableList = loadable(() => import('./List'));
const LoadablePie = loadable(() => import('./Pie'));
const LoadableRadial = loadable(() => import('./Radial'));

export const renderBlock = ({ kind, ...rest }, rowData, otherProps) => {
  switch (kind) {
    case 'area':
      return (
        <LoadableArea
          fallback={<div>Oading...</div>}
          rowData={rowData}
          {...otherProps}
          {...rest}
        />
      );
    case 'counter':
      return (
        <LoadableCounter
          fallback={<div>Oading...</div>}
          rowData={rowData}
          {...otherProps}
          {...rest}
        />
      );
    case 'geo':
      return (
        <LoadableGeo
          fallback={<div>Oading...</div>}
          rowData={rowData}
          {...otherProps}
          {...rest}
        />
      );
    case 'pie':
      return (
        <LoadablePie
          fallback={<div>Oading...</div>}
          rowData={rowData}
          {...otherProps}
          {...rest}
        />
      );
    case 'list':
      return (
        <LoadableList
          fallback={<div>Oading...</div>}
          rowData={rowData}
          {...otherProps}
          {...rest}
        />
      );
    case 'bar':
      return (
        <LoadableBar
          fallback={<div>Oading...</div>}
          rowData={rowData}
          {...otherProps}
          {...rest}
        />
      );
    case 'funnel':
      return (
        <LoadableFunnel
          fallback={<div>Oading...</div>}
          rowData={rowData}
          {...otherProps}
          {...rest}
        />
      );
    case 'radial':
      return (
        <LoadableRadial
          fallback={<div>Oading...</div>}
          rowData={rowData}
          {...otherProps}
          {...rest}
        />
      );
    default:
      return <p>Pippo</p>;
      break;
  }
};

export default class Blocks extends PureComponent<any> {
  render() {
    const { blocks, rowData, ...rest } = this.props;
    return blocks.map(block => renderBlock(block, rowData, rest));
  }
}
