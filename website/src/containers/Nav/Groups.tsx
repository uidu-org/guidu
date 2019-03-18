import * as React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Route, matchPath } from 'react-router-dom';

import { AkContainerNavigationNested as NestedNav } from '@atlaskit/navigation';

import DefaultNav from './navigations/Default';
import PackagesNav from './navigations/Packages';
import DocsNav from './navigations/Docs';
import PatternsNav from './navigations/Patterns';

import { Directory } from '../../types';

export type GroupsProps = {
  docs: Directory;
  patterns: Directory;
  packages: Directory;
  onClick?: (e: Event) => void | undefined;
};

export type GroupsState = {
  parentRoute?: Object | null;
  stack: Array<React.ReactNode>;
};

export type GroupsContext = {
  router: { route: Route };
};

class Groups extends React.Component<GroupsProps, GroupsState> {
  static contextTypes = {
    router: PropTypes.object,
  };

  state: GroupsState = {
    parentRoute: null,
    stack: [[]],
  };

  componentWillMount() {
    this.resolveRoutes(this.props.location.pathname);
  }

  componentWillReceiveProps(
    nextProps: GroupsProps,
    nextContext: GroupsContext,
  ) {
    this.resolveRoutes(nextProps.location.pathname);
  }

  resolveRoutes(pathname: string) {
    const { docs, packages, patterns } = this.props;

    const menus = [
      <Route path="/">
        <DefaultNav pathname={pathname} />
      </Route>,
      <Route path="/docs">
        <DocsNav pathname={pathname} docs={docs} />
      </Route>,
      <Route path="/packages">
        <PackagesNav pathname={pathname} packages={packages} />
      </Route>,
      <Route path="/packages">
        <PackagesNav pathname={pathname} packages={packages} />
      </Route>,
      <Route path="/patterns">
        <PatternsNav pathname={pathname} patterns={patterns} />
      </Route>,
    ];

    const stack = menus
      .filter(menu => matchPath(pathname, menu.props))
      .map(menu => [React.cloneElement(menu, { key: menu.props.path })]);

    const parentRoute =
      stack.length > 1 ? stack[stack.length - 2][0].props.path : null;

    this.setState({ parentRoute, stack });
  }

  render() {
    const { stack } = this.state;
    return <NestedNav stack={stack} />;
  }
}

export default withRouter(Groups);
