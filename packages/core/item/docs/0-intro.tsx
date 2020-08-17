import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`

# This package is for internal consumption only. Use at your own risk.

This is a generic Item component, designed to be composed declaratively into other components.
Item is generally a layout component, concerned with visual presentation of the content provided via props.

  ## Usage

  ${code`
  import Item from '@uidu/item';
  `}

  ${(
    <Example
      packageName="@uidu/item"
      Component={require('../examples/00-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic').default}
    />
  )}


  ${(
    <Props
      heading="Item Props"
      props={require('!!extract-react-types-loader!../src/components/Item')}
    />
  )}

  ${(
    <Props
      heading="ItemGroup Props"
      props={require('!!extract-react-types-loader!../src/components/ItemGroup')}
    />
  )}

  ${(
    <Props
      heading="withItemClick Props"
      props={require('!!extract-react-types-loader!../src/components/ItemGroup')}
    />
  )}

  ${(
    <Props
      heading="withItemFocus Props"
      props={require('!!extract-react-types-loader!../src/components/ItemGroup')}
    />
  )}

`;
