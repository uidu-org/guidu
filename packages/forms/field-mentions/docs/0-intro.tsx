import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Field Mentions
  <p class="lead">Enhanche a FieldText with mentions</p>

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a button-group component to make it easy to display
  multiple buttons together.

  ${code`import FieldMentions, { FieldMentionsStateless } from '@uidu/field-mentions';`}

  ${(
    <Example
      packageName="@uidu/field-mentions"
      Component={require('../examples/00-basic-example').default}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic-example').default}
    />
  )}

  ${(
    <Props
      heading="FieldMentions Props"
      props={require('!!extract-react-types-loader!../src/components/FieldMentions')}
    />
  )}
`;
