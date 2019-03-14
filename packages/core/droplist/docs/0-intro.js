// @flow
import React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`

An internal base component for implementing dropdown and select components.

 ## Usage

${code`
import DropList, {
  DroplistGroup,
  Item
} from '@uidu/droplist';
`}

  This is a base component on which such components as @uidu/dropdown-menu,
  @uidu/single-select, @uidu/multi-select are built. It contains only styles and
  very basic logic. It does not have any keyboard interactions, selectable logic or
  open/close functionality

  ${(
    <Example
      packageName="@uidu/droplist"
      Component={require('../examples/00-basic-example')}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic-example')}
    />
  )}

  ${(
    <Example
      packageName="@uidu/droplist"
      Component={require('../examples/01-bound-example')}
      title="With Label"
      source={require('!!raw-loader!../examples/01-bound-example')}
    />
  )}

   ${(
     <Props
       props={require('!!extract-react-types-loader!../src/components/Droplist')}
       heading="Droplist Props"
     />
   )}

   ${(
     <Props
       props={require('!!extract-react-types-loader!../src/components/Group')}
       heading="Group Props"
     />
   )}

   ${(
     <Props
       props={require('!!extract-react-types-loader!../src/components/Element')}
       heading="Element Props"
     />
   )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/Item')}
      heading="Item Props"
    />
  )}
`;
