import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  Component which renders a slider and is a substitute of the native input[range] element.
  ## Usage

  ${code`import FieldRange from '@uidu/field-range';`}

  The onChange prop provides a way to subscribe to changes in the value.

  ${(
    <Example
      packageName="@uidu/field-range"
      Component={require('../examples/00-basic-example').default}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic-example')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/FieldRange')}
      heading="FieldRange Props"
    />
  )}

`;
