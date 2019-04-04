import * as React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a button-group component to make it easy to display
  multiple buttons together.

  ## Usage

  ${code`import FieldMentions, { FieldMentionsStateless } from '@uidu/field-mentions';`}

  ${(
    <Example
      packageName="@uidu/field-mentions"
      Component={require('../examples/00-basic-example').default}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic-example')}
    />
  )}

  ${(
    <Props
      heading="FieldMentions Props"
      props={require('!!extract-react-types-loader!../src/components/FieldMentions')}
    />
  )}
`;
