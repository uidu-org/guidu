// @flow
import React, { Component, type Node } from 'react';
import BreadcrumbsStateless from './BreadcrumbsStateless';

type Props = {
  children?: Node,
};

type State = {|
  isExpanded: boolean,
|};

export default class Breadcrumbs extends Component<Props, State> {
  props: Props;

  static defaultProps = {
    children: null,
  };

  state = { isExpanded: false };

  expand = () => this.setState({ isExpanded: true });

  render() {
    return (
      <BreadcrumbsStateless
        {...this.props}
        isExpanded={this.state.isExpanded}
        onExpand={this.expand}
      />
    );
  }
}
