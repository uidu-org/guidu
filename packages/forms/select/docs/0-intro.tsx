import { code, Example, md } from '@uidu/docs';
import React from 'react';

export default md`
  React component which allows selection of an item or items from a dropdown list.
  Substitute for the native select element.

  ## Usage

  ${code`import Select, {
  components,
  createFilter,
  mergeStyles,
  AsyncSelect,
  CheckboxSelect,
  CountrySelect,
  RadioSelect,
  CreatableSelect,
  AsyncCreatableSelect,
  PopupSelect,
} from '@uidu/select';`}

  ${(
    <Example
      packageName="@uidu/select"
      Component={require('../examples/00-single-select').default}
      source={require('!!raw-loader!../examples/00-single-select')}
      title="Single"
    />
  )}

  ${(
    <Example
      packageName="@uidu/select"
      Component={require('../examples/01-multi-select').default}
      source={require('!!raw-loader!../examples/01-multi-select')}
      title="Multi"
    />
  )}

  ### Named Exports

  To consolidate patterns and improve developer experience \`@uidu/select\`
  provides some pre-configure components as named exports.

  ${(
    <Example
      packageName="@uidu/select"
      Component={require('../examples/02-radio-select').default}
      source={require('!!raw-loader!../examples/02-radio-select')}
      title="Radio Select"
    />
  )}

  ${(
    <Example
      packageName="@uidu/select"
      Component={require('../examples/03-checkbox-select').default}
      source={require('!!raw-loader!../examples/03-checkbox-select')}
      title="Checkbox Select"
    />
  )}

  ${(
    <Example
      packageName="@uidu/select"
      Component={require('../examples/04-country-select').default}
      source={require('!!raw-loader!../examples/04-country-select')}
      title="Country Select"
    />
  )}

  ${(
    <Example
      packageName="@uidu/select"
      Component={require('../examples/06-async-select-with-callback').default}
      source={require('!!raw-loader!../examples/06-async-select-with-callback')}
      title="Async Select"
    />
  )}

  ${(
    <Example
      packageName="@uidu/select"
      Component={require('../examples/09-creatable-select').default}
      source={require('!!raw-loader!../examples/09-creatable-select')}
      title="Creatable Select"
    />
  )}

  ${(
    <Example
      packageName="@uidu/select"
      Component={require('../examples/08-async-creatable-select').default}
      source={require('!!raw-loader!../examples/08-async-creatable-select')}
      title="AsyncCreatable Select"
    />
  )}

For further documentation regarding props, please refer to the react-select [documentation](https://react-select.com).

`;

/* TODO: Add the proper props on the documentation - AK-4705
${(
  //   <Props
  //     heading="Select Props"
  //     props={require('!!extract-react-types-loader!../src/createSelect')}
  //   />
 )}*/
