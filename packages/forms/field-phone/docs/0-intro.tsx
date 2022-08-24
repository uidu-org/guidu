import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Field Phone
  <p class="lead">Insert a phone number</p>

  FieldPhone uses \`react-phone-number-input\` to insert a phone number. It comes with intl support for countries phone number formatting.

  ${code`import FieldPhone, { FieldPhoneStateless } from '@uidu/field-phone';`}

  ${(
    <Example
      packageName="@uidu/field-phone"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  ${(
    <Props
      heading="FieldPhone Props"
      props={require('!!extract-react-types-loader!../src/components/FieldPhone')}
    />
  )}
  `;
