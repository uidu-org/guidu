import Avatar from '@uidu/avatar';
import Badge from '@uidu/badge';
import Lozenge from '@uidu/lozenge';
import Shell, { ShellMain, ShellResizer, ShellSidebar } from '@uidu/shell';
import React, { useState } from 'react';
import { Activity, Bell, Grid, MoreHorizontal, Settings } from 'react-feather';
import foo from '../examples-utils/assets/foo.svg';
import Navigation, { GlobalNavigation, NavigationItem } from '../src';

const schema = [
  {
    type: 'NavigationHeader',
    text: 'Team',
    before: <Avatar />,
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
            path: `/orders`,
            text: 'Ordini',
            type: 'NavigationSubItem',
          },
          {
            path: `/orders`,
            text: 'Ordini',
            type: 'NavigationSubItem',
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
        // heading: 'Teams',
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
                tw="text-center"
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
            path: `/`,
            type: 'NavigationItem',
            before: (
              <Avatar
                size="xsmall"
                // src={contact.avatar.thumb}
                // name={contact.name}
                name="test with tooltip"
              />
            ),
            text: '#dev',
          },
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

export default function Basic({}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Shell>
      <GlobalNavigation
        tw="flex border-r bg-indigo-400"
        isOpen={isOpen}
        navigationWidth={18}
        navigationMinWidth="18rem"
        header={{
          children: <Avatar />,
          name: 'Joydeed',
          onClick: () => setIsOpen(!isOpen),
        }}
        body={[
          {
            as: 'a',
            children: <Avatar size="small" />,
            name: 'Team',
          },
          {
            as: 'a',
            children: <Avatar src={foo} size="small" />,
            name: 'Anagrafica',
          },
          {
            as: 'a',
            children: <Avatar size="small" />,
            name: 'Donazioni',
          },
          {
            as: 'a',
            children: <Avatar size="small" />,
            name: 'Eventi',
          },
          {
            as: 'a',
            children: <Avatar size="small" />,
            name: 'Annunci',
          },
          {
            as: 'a',
            children: <Avatar size="small" />,
            name: 'CercaBandi',
          },
          {
            as: 'a',
            children: <Avatar size="small" />,
            name: 'Tesseramenti',
          },
          {
            as: 'a',
            children: <Avatar size="small" />,
            name: 'Tasks',
          },
          {
            as: 'a',
            children: <Avatar size="small" />,
            name: 'Website',
          },
          {
            as: 'a',
            children: <Avatar size="small" />,
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
          // { children: <Info size={20} />, name: 'Assistenza' },
          {
            children: <Avatar size="small" />,
            name: 'Andrea Vanini',
          },
        ]}
      />
      <ShellSidebar
        tw="border-r"
        style={{
          transition:
            'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s, min-width 300ms cubic-bezier(0.2, 0, 0, 1) 0s',
          ...(isCollapsed
            ? { width: '24px', minWidth: 0 }
            : { width: '18%', minWidth: '18rem' }),
        }}
      >
        <Navigation schema={schema} />
        <ShellResizer
          isCollapsed={isCollapsed}
          onClick={() => {
            console.log('clicked');
            setIsCollapsed(!isCollapsed);
          }}
        />
      </ShellSidebar>
      <ShellMain tw="bg-gray-300" />
    </Shell>
  );
}
