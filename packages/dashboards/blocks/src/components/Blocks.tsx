import loadable from '@loadable/component';
import React, { PureComponent } from 'react';
import Loader from './Loader';

const LoadableBlock = loadable(props => import(`./${props.kind}`));

export const renderBlock = (
  { kind, namespace, ...rest },
  rowData,
  otherProps,
) => {
  return (
    <LoadableBlock
      kind={kind}
      fallback={<Loader />}
      rowData={rowData[namespace]}
      {...rest}
      {...otherProps}
    />
  );
};

export default class Blocks extends PureComponent<any> {
  render() {
    const { blocks, rowData, ...rest } = this.props;
    return blocks.map(block => renderBlock(block, rowData, rest));
  }
}
