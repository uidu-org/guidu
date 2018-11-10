import React from 'react';
import { Grid } from 'react-feather';

export default function NavbarApps({ apps, ...otherProps }) {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link mx-2 d-flex align-items-center justify-content-center"
        data-toggle="dropdown"
        data-target="#"
        aria-expanded="false"
      >
        <Grid size={22} strokeWidth={1} />
      </a>
      <ul
        className="dropdown-menu dropdown-menu-right p-0"
        style={{ minWidth: '24rem' }}
      >
        <div className="d-flex flex-row align-content-around flex-wrap">
          {apps.map(({ url, name }) => (
            <a
              key={`navbar-app-${name}`}
              href={url}
              style={{
                width: `${100 / 3}%`,
              }}
              className="dropdown-item d-flex flex-column justify-content-center text-center p-3 m-0"
            >
              <img
                style={{ width: '4rem', height: '4rem' }}
                className="align-self-center lazyload mb-2"
                alt={name}
                data-src={require(`images/apps/${name}.png`)}
              />
              <small className="text-uppercase text-medium">{name}</small>
            </a>
          ))}
        </div>
      </ul>
    </li>
  );
}
