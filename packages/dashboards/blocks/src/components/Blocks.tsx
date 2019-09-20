import loadable from '@loadable/component';
import React, { PureComponent } from 'react';
import { BlocksProps } from '../types';

const LoadableBlock = loadable(props => import(`./${props.kind}`));

export const renderBlock = (
  { kind, namespace, ...rest },
  rowData,
  { comparatorData, ...otherProps },
) => {
  return (
    <LoadableBlock
      kind={kind}
      rowData={rowData}
      comparatorData={comparatorData}
      namespace={namespace}
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
