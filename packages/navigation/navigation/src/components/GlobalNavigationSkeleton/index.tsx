import React, { PureComponent } from 'react';
import { Skeleton } from '@uidu/avatar';
import ContentLoader from 'react-content-loader';
import { GlobalNavigation } from '..';

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
    primaryColor="#deebff"
    primaryOpacity={0.15}
    secondaryColor="#b6d3ff"
    secondaryOpacity={0.15}
  >
    <rect x="0" y="0" rx="3" ry="3" width="100%" height="22" />
  </ContentLoader>
);

export default class GlobalNavitationSkeleton extends PureComponent {
  render() {
    return (
      <GlobalNavigation
        header={{
          children: <Skeleton borderColor="transparent" />,
          name: 'Joydeed',
        }}
        body={Array.from(Array(10).keys()).map(i => ({
          children: <Skeleton size="small" borderColor="transparent" />,
          name: <GlobalItemLoader />,
        }))}
        footer={Array.from(Array(4).keys()).map(i => ({
          children: <Skeleton size="small" borderColor="transparent" />,
          name: <GlobalItemLoader />,
        }))}
      />
    );
  }
}
