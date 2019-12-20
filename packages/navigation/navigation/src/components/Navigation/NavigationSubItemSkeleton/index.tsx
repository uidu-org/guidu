import React, { PureComponent } from 'react';
import ContentLoader from 'react-content-loader';
import { StyledNavigationItem } from '../../../styled';
import { StyledNavigationLink } from '../NavigationSubItem';

const NavigationItemLoader = ({ hasBefore }) => (
  <ContentLoader
    style={{
      width: 'auto',
      height: 18,
      // marginRight: '3rem',
    }}
    height={18}
    width={244}
    speed={2}
    primaryColor="rgb(76, 86, 106)"
    primaryOpacity={0.085}
    secondaryColor="rgb(76, 86, 106)"
    secondaryOpacity={0.385}
  >
    {hasBefore && <circle cx="9" cy="9" r="9" />}
    <rect
      x={hasBefore ? 24 : 0}
      y="0"
      rx="3"
      ry="3"
      width={`${(Math.random() * (0.85 - 0.45) + 0.3) * 100}%`}
      height="18"
    />
  </ContentLoader>
);

export default class NavigationItem extends PureComponent<any> {
  static defaultProps = {
    hasBefore: false,
  };

  render() {
    const { hasBefore, ...otherProps } = this.props;

    return (
      <StyledNavigationItem {...otherProps}>
        <StyledNavigationLink className="d-block">
          <NavigationItemLoader hasBefore={hasBefore} />
        </StyledNavigationLink>
      </StyledNavigationItem>
    );
  }
}
