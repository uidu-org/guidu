import React from 'react';
import PropTypes from 'prop-types';
import '@material/elevation/dist/mdc.elevation.css';

export default function Navbar({ campaign, history }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light justify-content-between mdc-elevation--z1">
      <div className="navbar-header">
        <a
          tabIndex={0}
          role="button"
          onClick={() => history.goBack()}
          className="navbar-brand d-flex align-items-center"
        >
          <i className="icon icon-arrow-left mr-3" />{' '}
          <span>{campaign.id ? campaign.name : 'Nuova campagna SMS'}</span>
        </a>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  campaign: PropTypes.shape(PropTypes.obj),
  history: PropTypes.shape(PropTypes.obj).isRequired,
};

Navbar.defaultProps = {
  campaign: {},
};
