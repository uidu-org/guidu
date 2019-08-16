import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  # Field Image Uploader


  ## Usage

  ${code`import FieldDate, { FieldDateStateless } from '@uidu/field-date';`}

  ${(
    <Example
      packageName="@uidu/field-date"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}

  ${(
    <Example
      packageName="@uidu/field-date"
      Component={require('../examples/Avatar').default}
      title="Avatar"
      source={require('!!raw-loader!../examples/Avatar')}
    />
  )}

  ${(
    <Props
      heading="FieldDate Props"
      props={require('!!extract-react-types-loader!../src/components/FieldImageUploader')}
    />
  )}
  `;
