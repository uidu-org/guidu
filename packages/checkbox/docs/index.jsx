// @flow
import React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`
  ### Usage

  A checkbox element primarily for use in forms.

  ${code`
  import {
    Checkbox,
    CheckboxGroup
  } from '@uidu/checkbox';
  `}

  The Checkbox export provides for controlled & uncontrolled usage and includes the label, input & icon.

  ${(
    <Example
      packageName="@uidu/checkbox"
      Component={require('../examples/00-basic-usage').default}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic-usage')}
    />
  )}

  ${(
    <Example
      packageName="@uidu/checkbox"
      Component={require('../examples/03-indeterminate').default}
      title="Indeterminate"
      source={require('!!raw-loader!../examples/03-indeterminate')}
    />
  )}


  ${(
    <Example
      packageName="@uidu/checkbox"
      Component={require('../examples/04-checkbox-form').default}
      title="With a Form"
      source={require('!!raw-loader!../examples/04-checkbox-form')}
    />
  )}

  #### Checkbox Props
  ${<Props props={require('!!extract-react-types-loader!../src/Checkbox')} />}

  #### CheckboxGroup Props
  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/CheckboxGroup')}
    />
  )}


`;
