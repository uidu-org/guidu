import React from 'react';
import ContentLoader from 'react-content-loader';
import { StyledNavigationItem } from '../../../styled';
import { StyledNavigationLink } from '../NavigationItem';

function NavigationItemLoader({ hasBefore, hasAfter }) {
  return (
    <ContentLoader
      style={{
        width: 'auto',
        height: 22,
        // marginRight: '3rem',
      }}
      height={22}
      width={244}
      speed={2}
      backgroundColor="rgb(76, 86, 106)"
      backgroundOpacity={0.085}
      foregroundColor="rgb(76, 86, 106)"
      foregroundOpacity={0.385}
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
      {hasAfter && <circle cx="11" cy="11" r="11" />}
    </ContentLoader>
  );
}

export default function NavigationItem({
  hasBefore = false,
  hasAfter = false,
  ...rest
}) {
  return (
    <StyledNavigationItem {...rest}>
      <StyledNavigationLink className="d-block">
        <NavigationItemLoader hasBefore={hasBefore} hasAfter={hasAfter} />
      </StyledNavigationLink>
    </StyledNavigationItem>
  );
}
