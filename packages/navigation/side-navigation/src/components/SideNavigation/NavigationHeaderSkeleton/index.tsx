import React, { PureComponent } from 'react';
import ContentLoader from 'react-content-loader';
import StyledNavigationHeader from '../NavigationHeader/styled';

const NavigationItemLoader = ({ hasBefore }) => (
  <ContentLoader
    style={{
      width: 'auto',
      height: 22,
      // marginRight: '3rem',
    }}
    height={22}
    width={244}
    speed={2}
    backgroundColor="rgb(var(--body-on-secondary-bg))"
    backgroundOpacity={1}
    foregroundColor="rgb(var(--body-on-secondary-bg))"
    foregroundOpacity={0.6}
  >
    {hasBefore && <circle cx="11" cy="11" r="11" />}
    <rect
      x={hasBefore ? 30 : 0}
      y="0"
      rx="3"
      ry="3"
      width={`${(Math.random() * (0.85 - 0.45) + 0.3) * 100}%`}
      height="22"
    />
  </ContentLoader>
);

export default class NavigationHeaderSkeleton extends PureComponent<any> {
  static defaultProps = {
    hasBefore: false,
  };

  render() {
    const { hasBefore, ...otherProps } = this.props;

    return (
      <StyledNavigationHeader tw="border-b">
        <NavigationItemLoader hasBefore={hasBefore} />
      </StyledNavigationHeader>
    );
  }
}
