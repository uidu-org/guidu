import Avatar from '@uidu/avatar';
import React from 'react';
import { Bell, MoreHorizontal, Settings } from 'react-feather';
import { Link } from 'react-router-dom';

const items = [
  {
    id: '0',
    to: `/orders/done`,
    text: 'Effettuati',
    actions: [{ text: 'More', icon: <MoreHorizontal size={14} /> }],
  },
  {
    id: '1',
    to: `/orders/todo`,
    as: Link,
    text: 'Inevasi',
    actions: [{ text: 'More', icon: <MoreHorizontal size={14} /> }],
  },
  {
    id: '1',
    to: `/orders/todo`,
    as: Link,
    type: 'NavigationSubItemSkeleton',
    text: 'Da completare',
    actions: [{ text: 'More', icon: <MoreHorizontal size={14} /> }],
  },
  {
    id: '1',
    to: `/orders/todo`,
    as: Link,
    type: 'NavigationSubItemSkeleton',
    text: 'In forse',
    actions: [{ text: 'More', icon: <MoreHorizontal size={14} /> }],
    hasBefore: true,
  },
  {
    id: '2',
    to: `/orders/sent`,
    as: Link,
    text: 'Completati con una label molto lunga che dovrebbe nascondersi',
    actions: [
      {
        text: 'More',
        icon: <MoreHorizontal size={14} />,
        actions: [
          {
            text: 'trash',
            onClick: (e) => {
              e.stopPropagation();
              window.alert('test');
            },
          },
        ],
      },
    ],
  },
];

export const schemaGenerator = ({ align, animated }) => {
  return [
    {
      type: 'NavigationHeader',
      text: 'Team',
      before: <Avatar borderColor="transparent" />,
    },
    {
      type: 'PrimarySection',
      align,
      items: [
        {
          type: 'NavigationGroup',
          animated,
          items: [
            {
              to: `/`,
              text: 'Riepilogo',
              type: 'NavigationItem',
            },
            {
              to: `/orders`,
              text: 'Ordini',
              type: 'NavigationItem',
              items: items,
            },
            {
              to: `/attendances`,
              text: 'Partecipanti',
              type: 'NavigationItem',
              dropdown: () => <div className="bg-danger p-5">Aiuto</div>,
            },
            {
              to: `/messages`,
              text: 'Messaggi agli iscritti',
              type: 'NavigationItem',
            },
          ],
        },
        {
          type: 'NavigationGroup',
          items: [
            {
              to: `/`,
              text: 'Riepilogo',
              type: 'NavigationItem',
            },
          ],
        },
      ],
    },
    {
      type: 'SecondarySection',
      items: [
        {
          type: 'NavigationIconItem',
          icon: <Settings size={18} />,
        },
        {
          type: 'NavigationIconItem',
          icon: <Bell size={18} />,
        },
        {
          to: `/`,
          type: 'NavigationIconItem',
          icon: (
            <img
              src="https://via.placeholder.com/24x24"
              className="rounded-circle"
            />
          ),
        },
        {
          type: 'InlineComponent',
          component: () => (
            <button className="btn btn-primary ml-3">Ciaon</button>
          ),
        },
      ],
    },
  ];
};
