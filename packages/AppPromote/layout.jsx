import React from 'react';
import PropTypes from 'prop-types';

import { NavLink as Link } from 'react-router-dom';

import {
  OffcanvasWrapper,
  OffcanvasSidebar,
  OffcanvasMain,
} from 'components/Offcanvas';

export default function PromoteLayout({ children, match, ...otherProps }) {
  return (
    <OffcanvasWrapper className="l-viewport-wrapper" id="main-navigation">
      <OffcanvasSidebar>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link exact to={`${match.url}`} className="nav-link">
              Riepilogo
            </Link>
          </li>
          <br />
          <li className="nav-item">
            <a className="nav-link">
              <i className="icon-settings mr-2" /> Campagne
            </a>
          </li>
          <li className="nav-item">
            <Link exact to={`${match.url}/emails`} className="nav-link">
              Email
            </Link>
          </li>
          <li className="nav-item">
            <Link exact to={`${match.url}/sms`} className="nav-link">
              SMS
            </Link>
          </li>
          <br />
          <li className="nav-item">
            <a className="nav-link">
              <i className="icon-feed mr-2" /> Condividi
            </a>
          </li>
          <li className="nav-item">
            <Link exact to={`${match.url}/share`} className="nav-link">
              Condividi sui social
            </Link>
          </li>
          <li className="nav-item">
            <Link exact to={`${match.url}/widgets`} className="nav-link">
              Sul tuo sito
            </Link>
          </li>
        </ul>
      </OffcanvasSidebar>
      <OffcanvasMain>
        <div className="row no-gutters justify-content-center">
          <div className="col-md-10">{children}</div>
        </div>
      </OffcanvasMain>
    </OffcanvasWrapper>
  );
}

PromoteLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
