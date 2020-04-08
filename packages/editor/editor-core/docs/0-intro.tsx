import { code, Example, md } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Editor
  <p class="lead">Powerful editor for designing pages and sharing documents in the teams</p>

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers. Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ${code`import Editor '@uidu/editor-core';`}

  ${(
    <Example
      packageName="@uidu/editor-core"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}
`;

// ${(
//   <Example
//     packageName="@uidu/stepper"
//     Component={require('../examples/WithEditorActions').default}
//     title="Basic"
//     source={require('!!raw-loader!../examples/WithEditorActions').default}
//   />
// )}
// ${(
//   <Props
//     heading="Sorter"
//     props={require('!!extract-react-types-loader!../src/create-editor/ReactEditorView')}
//   />
// )}
