// @flow

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { Route, matchPath } from 'react-router-dom';

import { AkContainerNavigationNested as NestedNav } from '@atlaskit/navigation';

import DefaultNav from './navigations/Default';
import PackagesNav from './navigations/Packages';
import DocsNav from './navigations/Docs';
import PatternsNav from './navigations/Patterns';

import type { Directory } from '../../types';

export type GroupsProps = {
  docs: Directory,
  patterns: Directory,
  packages: Directory,
};

export type GroupsState = {
  parentRoute: ?Object,
  stack: Array<Node>,
};

export type GroupsContext = {
  router: Object,
};

export default class Groups extends React.Component<GroupsProps, GroupsState> {
  static contextTypes = {
    router: PropTypes.object,
  };

  state = {
    parentRoute: null,
    stack: [[]],
  };

  componentWillMount() {
    this.resolveRoutes(this.context.router.route.location.pathname);
  }

  componentWillReceiveProps(
    nextProps: GroupsProps,
    nextContext: GroupsContext,
  ) {
    this.resolveRoutes(nextContext.router.route.location.pathname);
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
