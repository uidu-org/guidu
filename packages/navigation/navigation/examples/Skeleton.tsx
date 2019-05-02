import React, { Component } from 'react';
import Shell, {
  ShellHeader,
  ShellContent,
  ShellNavigation,
  ShellBody,
} from '@uidu/shell';
import Navigation, { GlobalNavigationSkeleton } from '../src';

const schema = [
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
        <GlobalNavigationSkeleton />
        <ShellContent>
          <ShellNavigation
            style={{ display: 'flex', flex: '0 1 25%' }}
            // className="bg-light"
          >
            <ShellHeader>
              <div className="d-flex px-4 h-100 w-100 align-items-center">
                <h5 className="ml-2 mb-0">AppName</h5>
              </div>
            </ShellHeader>
            <ShellBody scrollable>
              <Navigation schema={schema} />
            </ShellBody>
          </ShellNavigation>
        </ShellContent>
      </Shell>
    );
  }
}
