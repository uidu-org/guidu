import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';

import { Route } from 'react-router-dom';

import Settings from './settings';
import Integrations from './integrations';
import Templates from './templates';

const pagesComponents = {
  settings: <Settings />,
  integrations: <Integrations />,
  templates: <Templates />,
};

export default class AppPages extends PureComponent {
  render() {
    const { layout, pages, ...otherProps } = this.props;
    return Object.keys(pages).map(page => {
      return (
        <Route
          exact
          path={`/${page}`}
          render={() =>
            layout(
              cloneElement(pagesComponents[page], {
                ...otherProps,
                ...pages[page].props,
              }),
            )
          }
        />
      );
    });
  }
}

AppPages.propTypes = {
  layout: PropTypes.func.isRequired,
  pages: PropTypes.shape(PropTypes.obj).isRequired,
};
