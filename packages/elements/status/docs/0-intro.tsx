import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';
import StatusExample from '../examples/00-simple-status';
import StatusPickerExample from '../examples/01-status-picker';

const StatusSource = require('!!raw-loader!../examples/00-simple-status')
  .default;
const StatusPickerSource = require('!!raw-loader!../examples/01-status-picker')
  .default;

const StatusPickerProps = require('!!extract-react-types-loader!../src/components/StatusPicker');

export default md`
This component is the implementation of the Status element in React.

## Usage
  ### Status
  ${code`import { Status, Color } from '@uidu/status';`}

  ${(
    <Example
      packageName="@uidu/status"
      Component={StatusExample}
      title="Status"
      source={StatusSource}
    />
  )}

  ### Status Picker

  ${code`import { StatusPicker } from '@uidu/status';`}



  ${(
    <Example
      packageName="@uidu/status"
      Component={StatusPickerExample}
      title="Status Picker"
      source={StatusPickerSource}
    />
  )}

  ${(<Props heading="StatusPicker Props" props={StatusPickerProps} />)}
`;

// TODO: Add Props for Status when pretty prop types support function.
