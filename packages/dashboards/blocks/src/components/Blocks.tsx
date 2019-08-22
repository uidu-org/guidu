import loadable from '@loadable/component';
import React, { PureComponent } from 'react';
import { BlocksProps } from '../types';
import Loader from './Loader';

const LoadableBlock = loadable(props => import(`./${props.kind}`));

export const renderBlock = (
  { kind, namespace, ...rest },
  rowData,
  { comparatorData, ...otherProps },
) => {
  return (
    <LoadableBlock
      kind={kind}
      fallback={<Loader />}
      rowData={rowData[namespace]}
      comparatorData={comparatorData[namespace]}
      {...rest}
      {...otherProps}
    />
  );
};

export default class Blocks extends PureComponent<BlocksProps> {
  render() {
    const { blocks, rowData, ...rest } = this.props;
    return blocks.map(block => renderBlock(block, rowData, rest as any));
  }
}
