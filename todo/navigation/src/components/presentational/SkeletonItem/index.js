// @flow

import React, { PureComponent } from 'react';
import { css } from 'emotion';

import { withContentTheme, styleReducerNoOp } from '../../../theme';
import type { SkeletonItemProps } from './types';

class SkeletonItem extends PureComponent<SkeletonItemProps> {
  static defaultProps = {
    hasBefore: false,
    styles: styleReducerNoOp,
  };

  render() {
    const { hasBefore, styles: styleReducer, theme } = this.props;

    const { mode, context } = theme;
    const defaultStyles = mode.skeletonItem()[context];
    const styles = styleReducer(defaultStyles);

    return (
      <div className={css({ '&&': styles.wrapper })}>
        {hasBefore && <div css={styles.before} />}
        <div css={styles.content} />
      </div>
    );
  }
}

export default withContentTheme(SkeletonItem);
