import React, { Component } from 'react';
import { Activity, Settings, Grid, Bell, Info } from 'react-feather';
import Badge from '@uidu/badge';
import Lozenge from '@uidu/lozenge';
import Shell, {
  ShellHeader,
  ShellContent,
  ShellNavigation,
  ShellBody,
} from '@uidu/shell';
import Navigation, { GlobalNavigationSkeleton } from '../src';

const schema = [
  {
    items: [
      {
        path: `/`,
        text: 'Riepilogo',
      },
      {
        path: `/orders`,
        text: 'Ordini',
      },
      {
        path: `/attendances`,
        text: 'Partecipanti',
      },
      {
        path: `/messages`,
        text: 'Messaggi agli iscritti',
      },
    ],
  },
  {
    icon: <Activity className="mr-2" size={14} />,
    text: 'Browse',
    heading: 'Browse',
    items: [
      {
        path: `/`,
        text: [
          <div className="d-flex align-items-center">
            <div
              style={{
                width: '18px',
                height: '18px',
                backgroundColor: 'cadetblue',
                borderRadius: '100%',
              }}
              className="mr-2"
            />
            #general
          </div>,
          <Badge max={10}>{20}</Badge>,
        ],
      },
      {
        path: `/`,
        text: [
          <div className="d-flex align-items-center">
            <div
              style={{
                width: '18px',
                height: '18px',
                backgroundColor: 'cadetblue',
                borderRadius: '100%',
              }}
              className="mr-2"
            />
            #marketing
          </div>,
        ],
      },
      {
        path: `/`,
        text: [
          <div className="d-flex align-items-center">
            <div
              style={{
                width: '18px',
                height: '18px',
                backgroundColor: 'cadetblue',
                borderRadius: '100%',
              }}
              className="mr-2"
            />
            #dev
          </div>,
        ],
      },
    ],
  },
  {
    text: [
      <div className="d-flex align-items-center">
        <Settings size={18} className="mr-2" /> Ordini
      </div>,
    ],
    items: [
      {
        path: `/attendances`,
        text: ['Ordini', <Lozenge>Closed</Lozenge>],
      },
      {
        path: `/messages`,
        text: 'Messaggi agli iscritti',
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
            className="bg-light"
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
