import React from 'react';
import ContentLoader from 'react-content-loader';
import { StyledNavigationItem } from '../../../styled';
import { StyledNavigationLink } from '../NavigationItem';

const NavigationItemLoader = ({ hasBefore, hasAfter, width }) => (
  <ContentLoader
    style={{
      width: '100%',
      height: 20,
      // marginRight: '3rem',
    }}
    height={20}
    width={width}
    speed={2}
    backgroundColor="var(--light)"
    backgroundOpacity={1}
    foregroundColor="var(--light)"
    foregroundOpacity={0.6}
  >
    {hasBefore && <circle cx="10" cy="10" r="10" />}
    <rect
      x={hasBefore ? 30 : 0}
      y="1"
      rx="3"
      ry="3"
      width={`${width || `${(Math.random() * (0.85 - 0.45) + 0.3) * 100}%`}`}
      height="18"
    />
    {hasAfter && <circle cx="95%" cy="10" r="10" />}
  </ContentLoader>
);

export default function NavigationItemSkeleton({
  hasBefore = false,
  hasAfter = false,
  width,
}) {
  return (
    <StyledNavigationItem>
      <StyledNavigationLink className="d-block" $actionsCount={0}>
        <NavigationItemLoader
          hasBefore={hasBefore}
          hasAfter={hasAfter}
          width={width}
        />
      </StyledNavigationLink>
    </StyledNavigationItem>
  );
}
