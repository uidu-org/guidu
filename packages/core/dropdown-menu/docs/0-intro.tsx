import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
The dropdown menu has two exports, a default stateful component, and a stateless component when you want to have more direct control over all actions.

## Usage

${code`import DropdownMenu, { DropdownItemGroup, DropdownItem, DropdownMenuStateless } from @uidu/dropdown-menu;`}

The stateful component handles selection for you, while still providing several functions that allow you to retrieve information from a form, most notably onItemActivated, which returns an item when it is clicked on.

${(
  <Example
    packageName="@uidu/dropdown-menu"
    Component={require('../examples/01-default-dropdown-menu').default}
    title="Default Dropdown"
    source={
      require('!!raw-loader!../examples/01-default-dropdown-menu').default
    }
  />
)}

${(
  <Example
    packageName="@uidu/dropdown-menu"
    Component={require('../examples/02-complex-dropdown-menu').default}
    title="Complex Dropdown"
    source={
      require('!!raw-loader!../examples/02-complex-dropdown-menu').default
    }
  />
)}

${(
  <Example
    packageName="@uidu/dropdown-menu"
    Component={require('../examples/03-stateless-dropdown-menu').default}
    title="Stateless Dropdown"
    source={
      require('!!raw-loader!../examples/03-stateless-dropdown-menu').default
    }
  />
)}



${(
  <Props
    heading="DropdownMenu Props"
    props={require('!!extract-react-types-loader!../src/components/DropdownMenu')}
  />
)}


`;
