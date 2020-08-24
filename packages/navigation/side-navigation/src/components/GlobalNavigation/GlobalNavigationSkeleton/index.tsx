import { Skeleton } from '@uidu/avatar';
import React from 'react';
import ContentLoader from 'react-content-loader';
import GlobalNavigation from '..';
import { GlobalNavigationProps } from '../types';

const GlobalItemLoader = () => (
  <ContentLoader
    style={{
      width: 'auto',
      height: 22,
      marginRight: '3rem',
    }}
    height={22}
    // width={140}
    speed={2}
    backgroundColor="#deebff"
    backgroundOpacity={0.15}
    foregroundColor="#b6d3ff"
    foregroundOpacity={0.15}
  >
    <rect
      x="0"
      y="0"
      rx="3"
      ry="3"
      width={`${(Math.random() * (0.85 - 0.45) + 0.3) * 100}%`}
      height="22"
    />
  </ContentLoader>
);

export default function GlobalNavigationSkeleton(props: GlobalNavigationProps) {
  return (
    <GlobalNavigation
      {...props}
      header={{
        children: <Skeleton />,
        name: 'Joydeed',
      }}
      body={Array.from(Array(10).keys()).map(i => ({
        children: <Skeleton size="small" />,
        name: <GlobalItemLoader />,
      }))}
      footer={Array.from(Array(4).keys()).map(i => ({
        children: <Skeleton size="small" />,
        name: <GlobalItemLoader />,
      }))}
    />
  );
}
