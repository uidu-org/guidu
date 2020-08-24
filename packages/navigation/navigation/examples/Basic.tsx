import Avatar from '@uidu/avatar';
import { ShellMain } from '@uidu/shell';
import React, { Component } from 'react';
import { Bell, MoreHorizontal, Settings } from 'react-feather';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Navigation from '../src';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class Basic extends Component<any, { isCollapsed: boolean }> {
  state = {
    isCollapsed: false,
    items: [
      {
        id: '0',
        path: `/orders/done`,
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
        text: 'Inevasi',
        actions: [{ text: 'More', icon: <MoreHorizontal size={14} /> }],
      },
      {
        id: '1',
        to: `/orders/todo`,
        as: Link,
        type: 'NavigationSubItemSkeleton',
        text: 'Inevasi',
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
    ],
  };

  render() {
    const { isCollapsed, items } = this.state;
    return (
      <Router>
        <ShellMain className="bg-light">
          <Navigation
            schema={[
              {
                type: 'NavigationHeader',
                text: 'Team',
                before: <Avatar borderColor="transparent" />,
              },
              {
                type: 'PrimarySection',
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
                    isSortable: true,
                    onDragEnd: (result) => {
                      if (!result.destination) {
                        return;
                      }

                      const reorderedItems = reorder(
                        items,
                        result.source.index,
                        result.destination.index,
                      );

                      this.setState({
                        items: reorderedItems,
                      });
                    },
                    isOpen: true,
                    items: items,
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
                    path: `/`,
                    type: 'NavigationIconItem',
                    icon: (
                      <img
                        src="https://via.placeholder.com/24x24"
                        className="rounded-circle"
                      />
                    ),
                  },
                ],
              },
            ]}
          />
        </ShellMain>
      </Router>
    );
  }
}
