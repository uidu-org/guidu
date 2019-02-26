// @flow
import React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`

  Text Field provides a form input.

  ## Usage

${code`
import FieldText, { FieldTextStateless } from '@uidu/field-text';
`}

  Text Field exports both a stateful default component, and a stateless component.
  The stateful component manages the value of the input for you and passes all
   other props on to the stateless version.

  ${(
    <Example
      packageName="@uidu/field-text"
      Component={require('../examples/00-basic-example')}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic-example')}
    />
  )}

  ${(
    <Example
      packageName="@uidu/field-text"
      Component={require('../examples/01-stateless-example')}
      title="Stateless Example"
      source={require('!!raw-loader!../examples/01-stateless-example')}
    />
  )}

  ${(
    <Example
      packageName="@uidu/field-text"
      Component={require('../examples/02-form-example')}
      title="Form Example"
      source={require('!!raw-loader!../examples/02-form-example')}
    />
  )}


  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/FieldText')}
      heading="FieldText Props"
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/FieldTextStateless')}
      heading="FieldTextStateless Props"
    />
  )}

`;
