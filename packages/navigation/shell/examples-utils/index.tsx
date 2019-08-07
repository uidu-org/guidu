import Navigation from '@uidu/navigation';
import faker from 'faker';
import React from 'react';
import { Activity, Bell, Grid } from 'react-feather';

export const SidebarLogo = () => (
  <img
    style={{ width: '36px' }}
    className="img-responsive mx-auto rounded-circle"
    src="https://uidu.org/assets/icon-6ec32d4e9ab95f54d401a527d558ef16d7b23db42efecb906614e62c74b68366.png"
  />
);

export const NavigationHeader = ({ app }) => (
  <div className="d-flex px-4 h-100 w-100 align-items-center">
    <img
      style={{ width: '36px' }}
      className="img-responsive mr-3 rounded-circle"
      src={`https://uidu.org/images/apps/${app}.png`}
    />
    <strong className="text-capitalize">{app}</strong>
  </div>
);

const schema = [
  {
    type: 'NavigationHeader',
    text: 'Contatti',
  },
  {
    type: 'NavigationSection',
    items: [
      {
        type: 'NavigationGroup',
        text: 'Browse',
        before: <Activity className="mr-2" size={14} />,
        items: [
          {
            type: 'NavigationItem',
            path: `/`,
            text: 'Riepilogo',
          },
          {
            type: 'NavigationItem',
            path: `/orders`,
            text: 'Ordini',
          },
          {
            type: 'NavigationItem',
            path: `/attendances`,
            text: 'Partecipanti',
          },
          {
            type: 'NavigationItem',
            path: `/messages`,
            text: 'Messaggi agli iscritti',
          },
        ],
      },
    ],
  },
];

export const NavigationMenu = () => <Navigation schema={schema} />;

export const SidebarMenu = () => [
  <div className="my-2 text-center">
    <SidebarLogo />
  </div>,
  <div className="my-2 text-center">
    <SidebarLogo />
  </div>,
  <div className="my-2 text-center">
    <SidebarLogo />
  </div>,
  <div className="my-2 text-center">
    <SidebarLogo />
  </div>,
  <div className="my-2 text-center">
    <SidebarLogo />
  </div>,
  <div className="my-2 text-center">
    <SidebarLogo />
  </div>,
  <div className="my-2 text-center">
    <SidebarLogo />
  </div>,
  <div className="my-2 text-center">
    <SidebarLogo />
  </div>,
  <div className="my-2 text-center">
    <SidebarLogo />
  </div>,
];

export const SidebarFooter = () => (
  <ul className="nav navbar-nav align-items-center pt-3 flex-nowrap flex-shrink-0">
    <li className="nav-item">
      <a
        to="/apps"
        className="nav-link py-3 d-flex align-items-center justify-content-center position-relative text-light"
      >
        <Grid size={22} strokeWidth={1} />
      </a>
    </li>
    <li className="nav-item">
      <a
        exact
        className="nav-link py-3 d-flex align-items-center justify-content-center position-relative text-light"
        to="/notifications"
      >
        <Bell size={22} strokeWidth={1} />
      </a>
    </li>
    <li className="nav-item">
      <a
        to="/me"
        activeClassName="bg-light"
        className="nav-link py-3 text-center"
        aria-label={faker.internet.userName()}
      >
        <img
          alt={faker.internet.userName()}
          src={`https://api.adorable.io/avatars/80/${faker.internet.email()}.png`}
          style={{ width: '36px' }}
          className="img-responsive rounded-circle"
        />
      </a>
    </li>
  </ul>
);
