// @flow

import React, { Component, type Node } from 'react';
import getDisplayName from '../../util/getDisplayName';
import DropdownItemSelectionManager from '../context/DropdownItemSelectionManager';
import type { Behaviors } from '../../types';

type Props = {
  children?: Node,
  id: string,
};

// HOC that typically wraps @uidu/item/ItemGroup
const withDropdownItemSelectionManager = (
  WrappedComponent: any,
  selectionBehavior: Behaviors,
) =>
  class WithDropdownItemSelectionManager extends Component<Props> {
    static displayName = `WithDropdownItemSelectionManager(${getDisplayName(
      WrappedComponent,
    )})`;

    render() {
      const { children, id, ...otherProps } = this.props;

      return (
        <WrappedComponent {...otherProps}>
          <DropdownItemSelectionManager
            groupId={id}
            behavior={selectionBehavior}
          >
            {children}
          </DropdownItemSelectionManager>
        </WrappedComponent>
      );
    }
  };

export default withDropdownItemSelectionManager;
