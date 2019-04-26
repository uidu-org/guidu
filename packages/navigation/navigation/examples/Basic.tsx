import React, { Component } from 'react';
import { Activity, Settings, Grid, Bell, Info } from 'react-feather';
import Avatar from '@uidu/avatar';
import Badge from '@uidu/badge';
import Lozenge from '@uidu/lozenge';
import Shell, {
  ShellHeader,
  ShellContent,
  ShellNavigation,
  ShellBody,
} from '@uidu/shell';
import Navigation, { GlobalNavigation } from '../src';

import foo from '../examples-utils/assets/foo.svg';

const schema = [
  {
    children: [
      {
        path: `/`,
        name: 'Riepilogo',
      },
      {
        path: `/orders`,
        name: 'Ordini',
      },
      {
        path: `/attendances`,
        name: 'Partecipanti',
      },
      {
        path: `/messages`,
        name: 'Messaggi agli iscritti',
      },
    ],
  },
  {
    icon: <Activity className="mr-2" size={14} />,
    name: 'Browse',
    children: [
      {
        path: `/`,
        name: [
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
        name: [
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
        name: [
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
    name: [
      <div className="d-flex align-items-center">
        <Settings size={18} className="mr-2" /> Ordini
      </div>,
    ],
    children: [
      {
        path: `/attendances`,
        name: ['Ordini', <Lozenge>Closed</Lozenge>],
      },
      {
        path: `/messages`,
        name: 'Messaggi agli iscritti',
      },
    ],
  },
];

export default class Basic extends Component<any> {
  render() {
    return (
      <Shell>
        <GlobalNavigation
          header={{
            children: <Avatar borderColor="transparent" />,
            name: 'Joydeed',
          }}
          body={[
            {
              as: 'a',
              children: <Avatar size="small" borderColor="transparent" />,
              name: 'Team',
            },
            {
              as: 'button',
              children: (
                <Avatar src={foo} size="small" borderColor="transparent" />
              ),
              name: 'Anagrafica',
            },
            {
              as: 'button',
              children: <Avatar size="small" borderColor="transparent" />,
              name: 'Donazioni',
            },
            {
              as: 'button',
              children: <Avatar size="small" borderColor="transparent" />,
              name: 'Eventi',
            },
            {
              as: 'button',
              children: <Avatar size="small" borderColor="transparent" />,
              name: 'Annunci',
            },
            {
              as: 'button',
              children: <Avatar size="small" borderColor="transparent" />,
              name: 'CercaBandi',
            },
            {
              as: 'button',
              children: <Avatar size="small" borderColor="transparent" />,
              name: 'Tesseramenti',
            },
            {
              as: 'button',
              children: <Avatar size="small" borderColor="transparent" />,
              name: 'Tasks',
            },
            {
              as: 'button',
              children: <Avatar size="small" borderColor="transparent" />,
              name: 'Website',
            },
            {
              as: 'button',
              children: <Avatar size="small" borderColor="transparent" />,
              name: 'Moduli',
            },
          ]}
          footer={[
            { children: <Grid size={20} />, name: 'Applicazioni' },
            {
              children: <Bell size={20} />,
              badge: <Badge appearance="important">{3}</Badge>,
              name: 'Notifiche',
            },
            { children: <Info size={20} />, name: 'Assistenza' },
            {
              children: <Avatar size="small" borderColor="transparent" />,
              name: 'Andrea Vanini',
            },
          ]}
        />
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
