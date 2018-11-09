import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Grid } from 'react-feather';
import { UncontrolledTooltip } from 'reactstrap';

export default function NavbarApps({ apps }) {
  return [
    <ul
      className="nav flex-column align-items-center flex-nowrap mb-5"
      key="apps-list"
      style={{ overflow: 'scroll' }}
    >
      {apps.map(({ name }) => (
        <li className="nav-item mb-3" id={`app-navbar-${name}`}>
          <Link
            key={`sidebar-app-${name}`}
            to={`/apps/${name}`}
            // activeClassName="bg-light"
            className="nav-link d-flex align-items-center justify-content-center p-0 rounded"
            style={{
              width: '2.5rem',
              height: '2.5rem',
              filter: 'grayscale(100%)',
              opacity: 0.4,
            }}
            activeStyle={{
              backgroundColor: 'rgba(255,255,255,.4)',
              opacity: 1,
              filter: 'none',
            }}
            aria-label={name}
          >
            <img
              style={{
                width: 22,
                height: 22,
              }}
              className="align-self-center"
              alt={name}
              src={require(`images/apps/${name}-source.png`)}
            />
          </Link>
          <UncontrolledTooltip
            placement="right"
            target={`app-navbar-${name}`}
            boundariesElement="window"
            hideArrow
            delay={{ show: 0, hide: 0 }}
          >
            {name}
          </UncontrolledTooltip>
        </li>
      ))}
    </ul>,
    <Link
      key="apps-list-see-more"
      to="/apps"
      className="nav-link mx-2 d-flex align-items-center justify-content-center flex-shrink-0"
    >
      <Grid size={22} strokeWidth={1} />
    </Link>,
  ];
}
