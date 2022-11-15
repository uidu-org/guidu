import Avatar from '@uidu/avatar';
import Badge from '@uidu/badge';
import Shell, { ShellMain } from '@uidu/shell';
import React, { useState } from 'react';
import { Bell, Grid } from 'react-feather';
import foo from '../examples-utils/assets/foo.svg';
import { GlobalNavigation } from '../src';

export default function Basic() {
  const [isOpen, setIsOpen] = useState(false);
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
      <ShellMain tw="bg-gray-300" />
    </Shell>
  );
}
