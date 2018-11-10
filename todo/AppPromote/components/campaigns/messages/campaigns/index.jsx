import React from 'react';
import {
  NavLink as Link,
} from 'react-router-dom';
import NavbarAppActions from 'components/NavbarAppActions';

export default function Campaigns({ campaigns, match }) {
  return (
    <div>
      <NavbarAppActions
        brand={<a className="navbar-brand mr-auto">Campagne SMS</a>}
      >
        <Link
          to="/promote/sms/new"
          className="btn btn-sm"
        >
          <i className="icon-plus mr-2" /> Nuova campagna SMS
        </Link>
      </NavbarAppActions>
      <div className="list-group list-group-flush">
        {
          campaigns.map(campaign => (
            <Link
              key={campaign.id}
              to={`${match.path}/${campaign.id}`}
              className="list-group-item py-4"
            >
              {campaign.name}
            </Link>
          ))
        }
      </div>
    </div>
  );
}
