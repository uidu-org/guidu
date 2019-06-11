import Shell, { ShellContent, ShellNavigation } from '@uidu/shell';
import React, { Component } from 'react';
import Navigation, { GlobalNavigationSkeleton } from '../src';

const schema = [
  { type: 'NavigationHeaderSkeleton', text: 'Skeleton' },
  {
    type: 'NavigationSection',
    items: [
      {
        type: 'NavigationGroup',
        items: Array.from(Array(4).keys()).map(() => ({
          type: 'NavigationItemSkeleton',
        })),
      },
      {
        type: 'NavigationGroup',
        items: Array.from(Array(4).keys()).map(() => ({
          hasBefore: true,
          width: '25%',
          type: 'NavigationItemSkeleton',
        })),
      },
    ],
  },
];

export default class Basic extends Component<any> {
  render() {
    return (
      <Shell>
        <GlobalNavigationSkeleton navigationWidth={25} />
        <ShellContent>
          <ShellNavigation
            style={{ display: 'flex', flex: '0 1 25%' }}
            className="bg-light border-right"
          >
            <Navigation schema={schema} />
          </ShellNavigation>
        </ShellContent>
      </Shell>
    );
  }
}
