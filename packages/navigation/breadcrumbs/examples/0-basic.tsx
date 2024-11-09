import React from 'react';

import { FaceSmileIcon } from '@heroicons/react/24/solid';
import { BreadcrumbsItem, BreadcrumbsStateless } from '../src';

export default class BreadcrumbsExpand extends React.Component<
  {},
  { isExpanded: boolean }
> {
  state = {
    isExpanded: false,
  };

  expand(e: React.MouseEvent) {
    e.preventDefault();
    this.setState({ isExpanded: true });
  }

  render() {
    return (
      <BreadcrumbsStateless
        isExpanded={this.state.isExpanded}
        onExpand={(e) => this.expand(e)}
      >
        <BreadcrumbsItem href="/pages" text="Pages" />
        <BreadcrumbsItem href="/pages/home" text="Home" />
        <BreadcrumbsItem
          href="/item"
          iconBefore={<FaceSmileIcon label="Test icon" size="small" />}
          text="Icon Before"
        />
        <BreadcrumbsItem
          href="/item"
          iconAfter={<FaceSmileIcon label="Test icon" size="small" />}
          text="Icon After"
        />
      </BreadcrumbsStateless>
    );
  }
}
