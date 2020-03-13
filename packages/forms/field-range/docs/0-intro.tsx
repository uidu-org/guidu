import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  ### FieldRange
  <p class="lead">Substitute for input range element</p>

  Component which renders a slider and is a substitute of the native input[range] element.
  The onChange prop provides a way to subscribe to changes in the value.

  ${code`import FieldRange from '@uidu/field-range';`}

  ${(
    <Example
      packageName="@uidu/field-range"
      Component={require('../examples/Scaffold').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Scaffold').default}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/FieldRange')}
      heading="FieldRange Props"
    />
  )}

`;
