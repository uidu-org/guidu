import React, { Component } from 'react';
import {
  Activity,
  Settings,
  Grid,
  Bell,
  Info,
  MoreHorizontal,
} from 'react-feather';
import Avatar from '@uidu/avatar';
import Badge from '@uidu/badge';
import Lozenge from '@uidu/lozenge';
import Shell, { ShellContent, ShellNavigation } from '@uidu/shell';
import Navigation, { GlobalNavigation, NavigationItem } from '../src';

import foo from '../examples-utils/assets/foo.svg';

const schema = [
  {
    type: 'NavigationHeader',
    text: 'Team',
    before: <Avatar borderColor="transparent" />,
  },
  {
    type: 'NavigationSection',
    items: [
      {
        type: 'NavigationGroup',
        items: [
          {
            path: `/`,
            text: 'Riepilogo',
            type: 'NavigationItem',
          },
          {
            path: `/orders`,
            text: 'Ordini',
            type: 'NavigationItem',
          },
          {
            path: `/attendances`,
            text: 'Partecipanti',
            type: 'NavigationItem',
          },
          {
            path: `/messages`,
            text: 'Messaggi agli iscritti',
            type: 'NavigationItem',
          },
        ],
      },
      {
        type: 'NavigationGroup',
        heading: 'Teams',
        after: <a className="text-transparent">Add</a>,
        items: [
          {
            path: `/`,
            type: 'NavigationItem',
            text: '#general',
            before: (
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: 'cadetblue',
                  borderRadius: '100%',
                }}
              />
            ),
            after: <Badge max={10}>{20}</Badge>,
          },
          {
            path: `/`,
            type: 'NavigationItem',
            before: (
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: 'cadetblue',
                  borderRadius: '100%',
                }}
              />
            ),
            text: '#marketing',
          },
          {
            path: `/`,
            type: 'NavigationItem',
            before: (
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: 'cadetblue',
                  borderRadius: '100%',
                }}
              />
            ),
            text: '#dev',
          },
          {
            type: 'InlineComponent',
            component: () => (
              <NavigationItem
                className="text-center"
                text={<MoreHorizontal />}
                onClick={console.log}
              />
            ),
          },
        ],
      },
      {
        type: 'NavigationGroup',
        before: <Activity size={14} />,
        text: 'Browse',
        heading: 'Browse',
        items: [
          {
            type: 'NavigationItem',
            before: <Settings size={18} />,
            text: 'Ordini',
          },
          {
            path: `/attendances`,
            type: 'NavigationItem',
            text: 'Ordini',
            after: <Lozenge>Closed</Lozenge>,
          },
          {
            path: `/messages`,
            type: 'NavigationItem',
            text: 'Messaggi agli iscritti',
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
        <GlobalNavigation
          navigationWidth={35}
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
            style={{ display: 'flex', flex: '0 1 35%', minWidth: 0 }}
            className="bg-light"
          >
            <Navigation schema={schema} />
          </ShellNavigation>
        </ShellContent>
      </Shell>
    );
  }
}
