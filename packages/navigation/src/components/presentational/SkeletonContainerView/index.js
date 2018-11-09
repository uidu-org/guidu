// @flow

import React, { Component, Fragment } from 'react';
import { gridSize as gridSizeFn } from '@atlaskit/theme';

import Section from '../Section';
import SkeletonContainerHeader from '../SkeletonContainerHeader';
import SkeletonItem from '../SkeletonItem';

const gridSize = gridSizeFn();

export default class SkeletonContainerView extends Component<{}> {
  render() {
    return (
      <Fragment>
        <Section>
          {({ css }) => (
            <div
              css={{
                ...css,
                paddingTop: gridSize * 2.5,
                paddingBottom: gridSize * 2.5,
              }}
            >
              <SkeletonContainerHeader hasBefore />
            </div>
          )}
        </Section>
        <Section>
          {({ className }) => (
            <div className={className}>
              <SkeletonItem hasBefore />
              <SkeletonItem hasBefore />
              <SkeletonItem hasBefore />
              <SkeletonItem hasBefore />
              <SkeletonItem hasBefore />
            </div>
          )}
        </Section>
      </Fragment>
    );
  }
}
