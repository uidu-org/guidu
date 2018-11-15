// @flow
import React from 'react';
import { colors } from '@atlaskit/theme';

import { Skeleton } from '../src';
import { Block, Gap } from '../examples-util/helpers';

export default () => (
  <div>
    <Block heading="Circle">
      <Skeleton name="xxlarge" size="xxlarge" />
      <Gap />
      <Skeleton name="xlarge" size="xlarge" />
      <Gap />
      <Skeleton name="large" size="large" />
      <Gap />
      <Skeleton name="medium" size="medium" />
      <Gap />
      <Skeleton name="small" size="small" />
      <Gap />
      <Skeleton name="xsmall" size="xsmall" />
    </Block>
    <Block heading="Square">
      <Skeleton appearance="square" size="xxlarge" />
      <Gap />
      <Skeleton appearance="square" size="xlarge" />
      <Gap />
      <Skeleton appearance="square" size="large" />
      <Gap />
      <Skeleton appearance="square" size="medium" />
      <Gap />
      <Skeleton appearance="square" size="small" />
      <Gap />
      <Skeleton appearance="square" size="xsmall" />
    </Block>
    <Block heading="Coloured via inheritance">
      <div style={{ color: colors.P500 }}>
        <Skeleton name="xxlarge" size="xxlarge" />
        <Gap />
        <Skeleton name="xlarge" size="xlarge" />
        <Gap />
        <Skeleton name="large" size="large" />
        <Gap />
        <Skeleton name="medium" size="medium" />
        <Gap />
        <Skeleton name="small" size="small" />
        <Gap />
        <Skeleton name="xsmall" size="xsmall" />
      </div>
    </Block>
    <Block heading="Coloured using props">
      <Skeleton name="xxlarge" size="xxlarge" color={colors.Y500} />
      <Gap />
      <Skeleton name="xlarge" size="xlarge" color={colors.G500} />
      <Gap />
      <Skeleton name="large" size="large" color={colors.B300} />
      <Gap />
      <Skeleton name="medium" size="medium" color={colors.R500} />
      <Gap />
      <Skeleton name="small" size="small" color={colors.N200} />
      <Gap />
      <Skeleton name="xsmall" size="xsmall" color={colors.T500} />
    </Block>
    <Block heading="With a strong weight">
      <Skeleton
        name="xxlarge"
        size="xxlarge"
        color={colors.Y500}
        weight="strong"
      />
      <Gap />
      <Skeleton
        name="xlarge"
        size="xlarge"
        color={colors.G500}
        weight="strong"
      />
      <Gap />
      <Skeleton name="large" size="large" color={colors.B300} weight="strong" />
      <Gap />
      <Skeleton
        name="medium"
        size="medium"
        color={colors.R500}
        weight="strong"
      />
      <Gap />
      <Skeleton name="small" size="small" color={colors.N200} weight="strong" />
      <Gap />
      <Skeleton
        name="xsmall"
        size="xsmall"
        color={colors.T500}
        weight="strong"
      />
    </Block>
  </div>
);
