// @flow

import React, { Component, type Node } from 'react';
import { ItemGroup } from '@uidu/item';

type Props = {
  /** DropdownItems to be rendered inside the group.*/
  children?: Node,
  /** Optional heading text to be shown above the items. */
  title?: string,
  /** Content to be shown to the right of the title heading. Not shown if no title is set. */
  elemAfter?: Node | string,
};

export default class DropdownItemGroup extends Component<Props> {
  render() {
    const { children, elemAfter, title } = this.props;
    return (
      <ItemGroup elemAfter={elemAfter} title={title} role="menu">
        {children}
      </ItemGroup>
    );
  }
}
