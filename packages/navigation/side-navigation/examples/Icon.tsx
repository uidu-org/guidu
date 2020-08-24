import Shell, { ShellMain, ShellSidebar } from '@uidu/shell';
import React, { Component } from 'react';
import { CheckSquare, Grid, Info } from 'react-feather';
import Navigation from '../src';

const schema = [
  {
    type: 'NavigationSection',
    items: [
      {
        type: 'NavigationGroup',
        withPadding: false,
        items: [
          {
            path: `/`,
            type: 'NavigationIconItem',
            text: 'Info',
            icon: <Info />,
          },
          {
            path: `/`,
            type: 'NavigationIconItem',
            text: 'Tasks',
            icon: <CheckSquare />,
          },
          {
            path: `/`,
            type: 'NavigationIconItem',
            text: 'Tasks',
            icon: <CheckSquare />,
          },
          {
            path: `/`,
            type: 'NavigationIconItem',
            text: 'Tasks',
            icon: <CheckSquare />,
          },
          {
            path: `/`,
            type: 'NavigationIconItem',
            text: 'Tasks',
            icon: <CheckSquare />,
          },
        ],
      },
    ],
  },
  {
    type: 'NavigationFooter',
    items: [
      {
        type: 'NavigationGroup',
        withPadding: false,
        withMargin: false,
        items: [
          {
            type: 'NavigationIconItem',
            icon: <Grid />,
            text: 'Apps',
          },
        ],
      },
    ],
  },
];

export default class Basic extends Component<any> {
  render() {
    return (
      <Shell>
        <ShellSidebar
          style={{ display: 'flex', width: '4rem' }}
          // className="bg-light"
        >
          <Navigation schema={schema} />
        </ShellSidebar>
        <ShellMain />
      </Shell>
    );
  }
}
