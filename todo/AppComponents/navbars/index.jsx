import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Route } from 'react-router-dom';
import NavbarResponsive from 'utils/layout/navbar-responsive';

export default class AppNavbars extends PureComponent {
  render() {
    const { pages, ...otherProps } = this.props;
    return Object.keys(pages).map(page => [
      <Route
        exact
        path={`/${page}`}
        render={() => <NavbarResponsive {...otherProps} title={page} />}
      />,
      pages[page].map(subPage => (
        <Route
          exact
          path={`/${page}/${subPage}`}
          render={() => <NavbarResponsive {...otherProps} title={subPage} />}
        />
      )),
    ]);
  }
}

AppNavbars.propTypes = {
  pages: PropTypes.shape(PropTypes.obj).isRequired,
};
