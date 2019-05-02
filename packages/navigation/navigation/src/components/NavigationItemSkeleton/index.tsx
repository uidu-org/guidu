import React, { PureComponent } from 'react';
import ContentLoader from 'react-content-loader';
import {
  StyledNavigationItem,
  StyledNavigationLink,
} from '../NavigationItem/styled';

const NavigationItemLoader = ({ hasBefore }) => (
  <ContentLoader
    style={{
      width: 'auto',
      height: 22,
      // marginRight: '3rem',
    }}
    height={22}
    // width={140}
    speed={2}
    primaryColor="#f8f9fa"
    // primaryOpacity={0.15}
    secondaryColor="#f3f3f3"
    // secondaryOpacity={0.15}
  >
    {hasBefore && <circle cx="10" cy="11" r="9" />}
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

export default class NavigationItem extends PureComponent<any> {
  static defaultProps = {
    hasBefore: false,
  };

  render() {
    const { hasBefore, ...otherProps } = this.props;
    console.log(this.props);
    return (
      <StyledNavigationItem {...otherProps}>
        <StyledNavigationLink>
          <NavigationItemLoader hasBefore={hasBefore} />
        </StyledNavigationLink>
      </StyledNavigationItem>
    );
  }
}
