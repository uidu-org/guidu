import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  # Field Color Picker

  This is a component that controls user interactions and state for you so you can create autocomplete/dropdown/select/etc. components. It uses a render prop which gives you maximum flexibility with a minimal API because you are responsible for the rendering of everything and you simply apply props to what you're rendering.

  This differs from other solutions which render things for their use case and then expose many options to allow for extensibility resulting in a bigger API that is less flexible as well as making the implementation more complicated and harder to contribute to.

  ## Usage

  ${code`import FieldColorPicker from '@uidu/field-color-picker';`}

  ${(
    <Example
      packageName="@uidu/field-color-picker"
      Component={require('../examples/Basic').default}
      title="Basic exposed options select"
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}

  ${(
    <Props
      heading="Downshift Props"
      props={require('!!extract-react-types-loader!../src/components/FieldColorPicker')}
    />
  )}
`;
