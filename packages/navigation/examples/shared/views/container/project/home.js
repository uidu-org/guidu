// @flow

import React from 'react';
import { LinkItem } from '../../../components';

import ViewRegistrar from '../../common/view-registrar';

import { ProjectSwitcherItem } from '../common/project-switcher-item';

const getItems = () => [
  {
    id: 'container/project/index:header',
    items: [ProjectSwitcherItem],
    type: 'HeaderSection',
  },
  {
    id: 'container/project/index:menu',
    nestedGroupKey: 'menu',
    items: [
      {
        icon: 'BacklogIcon',
        id: 'backlog',
        text: 'Backlog',
        to: '/projects/endeavour',
        type: LinkItem,
      },
      {
        icon: 'BoardIcon',
        id: 'active-sprints',
        text: 'Active sprints',
        type: 'Item',
      },
      {
        icon: 'GraphLineIcon',
        id: 'reports',
        text: 'Reports',
        type: 'Item',
      },
      {
        icon: 'ShipIcon',
        id: 'releases',
        text: 'Releases',
        type: 'Item',
      },
      {
        icon: 'IssuesIcon',
        goTo: 'container/project/issues',
        id: 'issues',
        text: 'Issues',
        type: 'GoToItem',
      },
      {
        icon: 'IssuesIcon',
        goTo: 'container/project/sortable-issues',
        id: 'sortable-issues',
        text: 'Sortable Issues',
        type: 'GoToItem',
      },
    ],
    type: 'MenuSection',
  },
];

const HomeView = () => (
  <ViewRegistrar
    getItemsFactory={() => getItems}
    type="container"
    viewId="container/project/index"
  />
);

export default HomeView;
