import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'utils/components';
import AppUpgrade from 'components/AppComponents/upgrade';
import { MasterLayout } from 'utils/layouts';

const Performance = () => (
  <AppUpgrade>
    <PageHeader name="Performance" />
  </AppUpgrade>
);
const Sources = () => (
  <AppUpgrade>
    <PageHeader name="Acquisizione" />
  </AppUpgrade>
);
const Visitors = () => (
  <AppUpgrade>
    <PageHeader name="Pubblico" />
  </AppUpgrade>
);
const Main = () => (
  <AppUpgrade>
    <PageHeader name="Statistiche" />
  </AppUpgrade>
);

export default function appAnalytics({ match }) {
  return [
    {
      exact: true,
      path: `${match.path}/analytics/performance`,
      component: Performance,
      layout: MasterLayout,
    },
    {
      exact: true,
      path: `${match.path}/analytics/sources`,
      component: Sources,
      layout: MasterLayout,
    },
    {
      exact: true,
      path: `${match.path}/analytics/visitors`,
      component: Visitors,
      layout: MasterLayout,
    },
    {
      exact: true,
      path: `${match.path}/analytics`,
      component: Main,
      layout: MasterLayout,
    },
  ];
}
