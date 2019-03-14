// @flow

import React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`
The dropdown menu has two exports, a default stateful component, and a stateless component when you want to have more direct control over all actions.

## Usage

${code`import DropdownMenu, { DropdownItemGroup, DropdownItem, DropdownMenuStateless } from @uidu/dropdown-menu;`}

The stateful component handles selection for you, while still providing several functions that allow you to retrieve information from a form, most notably onItemActivated, which returns an item when it is clicked on.

${(
  <Example
    packageName="@uidu/dropdown-menu"
    Component={require('../examples/01-default-dropdown-menu')}
    title="Default Dropdown"
    source={require('!!raw-loader!../examples/01-default-dropdown-menu')}
  />
)}

${(
  <Example
    packageName="@uidu/dropdown-menu"
    Component={require('../examples/02-complex-dropdown-menu')}
    title="Complex Dropdown"
    source={require('!!raw-loader!../examples/02-complex-dropdown-menu')}
  />
)}

${(
  <Example
    packageName="@uidu/dropdown-menu"
    Component={require('../examples/03-stateless-dropdown-menu')}
    title="Stateless Dropdown"
    source={require('!!raw-loader!../examples/03-stateless-dropdown-menu')}
  />
)}

${
  (
    // Note: DropdownItem props are the same as Item props.
    // Unfortunately, we can't pass props direclty from DropdownItem as it is wrapped by a function and extract-react-type can't access it.
    // We decided to render directly the props from Item to help the consumer.
    <Props
      heading="DropdownItem Props"
      props={require('!!extract-react-types-loader!../../item/src/components/Item')}
    />
  )
}

${(
  <Props
    heading="DropdownItemGroup Props"
    props={require('!!extract-react-types-loader!../src/components/group/DropdownItemGroup')}
  />
)}

${(
  <Props
    heading="DropdownMenu Props"
    props={require('!!extract-react-types-loader!../src/components/DropdownMenu')}
  />
)}

${(
  <Props
    heading="DropdownMenuStateless Props"
    props={require('!!extract-react-types-loader!../src/components/DropdownMenuStateless')}
  />
)}

`;
