// @flow

import React, { Component, Fragment } from 'react';
import Button from '@atlaskit/button';
import Select from '@atlaskit/select';
import { BreadcrumbsStateless, BreadcrumbsItem } from '../src';

const data = [
  <BreadcrumbsItem href="/item" key="Item" text="Item" />,
  <BreadcrumbsItem href="/item" key="Another item" text="Another item" />,
  <BreadcrumbsItem href="/item" key="A third item" text="A third item" />,
  <BreadcrumbsItem
    href="/item"
    key="A fourth item with a very long name"
    text="A fourth item with a very long name"
  />,
  <BreadcrumbsItem
    href="/item"
    key="Yet another item"
    text="Yet another item"
  />,
  <BreadcrumbsItem href="/item" key="An item" text="An item" />,
  <BreadcrumbsItem href="/item" key="The next item" text="The next item" />,
  <BreadcrumbsItem
    href="/item"
    key="The item after the next item"
    text="The item after the next item"
  />,
  <BreadcrumbsItem href="/item" key="The ninth item" text="The ninth item" />,
  <BreadcrumbsItem href="/item" key="Item ten" text="Item ten" />,
  <BreadcrumbsItem href="/item" key="The last item" text="The last item" />,
];

const selectOptions = new Array(11)
  .fill()
  .map((_, i) => ({ label: i, value: i }));

type State = {
  isExpanded: boolean,
  itemsToShow: number,
  maxItems?: number,
  itemsAfterCollapse?: number,
  itemsBeforeCollapse?: number,
};

export default class BreadcrumbsExpand extends Component<{}, State> {
  state: State = {
    isExpanded: false,
    itemsToShow: 3,
  };

  expand(e: Event) {
    e.preventDefault();
    this.setState({ isExpanded: true });
  }

  render() {
    const {
      isExpanded,
      itemsToShow,
      maxItems,
      itemsBeforeCollapse,
      itemsAfterCollapse,
    } = this.state;
    return (
      <Fragment>
        <p>
          Some options to see how different breadcrumbs configurations work.
          Note that expanded breadcrumbs with <code>isExpanded: false</code>{' '}
          will not be collapsed if they are under the <code>maxItems</code>
        </p>
        <Button onClick={() => this.setState({ isExpanded: !isExpanded })}>
          {isExpanded ? 'Collapse' : 'Expand'} breadcrumbs
        </Button>
        <div
          style={{
            maxWidth: '200px',
            display: 'inline-block',
            padding: '20px',
          }}
        >
          <h3>Change how many breadcrumbs to show</h3>
          <Select
            defaultValue={selectOptions[3]}
            options={selectOptions}
            onChange={({ value }) => this.setState({ itemsToShow: value })}
          />
        </div>
        <div
          style={{
            maxWidth: '200px',
            display: 'inline-block',
            padding: '20px',
          }}
        >
          <h3>maxItems</h3>
          <Select
            defaultValue={selectOptions[8]}
            options={selectOptions}
            onChange={({ value }) => this.setState({ maxItems: value })}
          />
        </div>
        <div
          style={{
            maxWidth: '200px',
            display: 'inline-block',
            padding: '20px',
          }}
        >
          <h3>itemsBeforeCollapse</h3>
          <Select
            defaultValue={selectOptions[1]}
            options={selectOptions}
            onChange={({ value }) =>
              this.setState({ itemsBeforeCollapse: value })
            }
          />
        </div>
        <div
          style={{
            maxWidth: '200px',
            display: 'inline-block',
            padding: '20px',
          }}
        >
          <h3>itemsAfterCollapse</h3>
          <Select
            defaultValue={selectOptions[1]}
            options={selectOptions}
            onChange={({ value }) =>
              this.setState({ itemsAfterCollapse: value })
            }
          />
        </div>
        <BreadcrumbsStateless
          isExpanded={isExpanded}
          onExpand={e => this.expand(e)}
          maxItems={maxItems}
          itemsBeforeCollapse={itemsBeforeCollapse}
          itemsAfterCollapse={itemsAfterCollapse}
        >
          {data.slice(0, itemsToShow)}
        </BreadcrumbsStateless>
      </Fragment>
    );
  }
}
