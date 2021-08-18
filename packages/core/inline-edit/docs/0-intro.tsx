import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`
  The inline edit component is designed to not stand out as an input when it is not
  focused or being interacted with. It is designed to be used as a wrapper
  to control an input component.

  The default exported InlineEdit component is a standalone component (not meant to be used
  within Form), requiring a custom read view and edit view to be passed in as props. If you
  would like a simple inline edit with a text input, you may be able to use the
  [InlineEditableTextfield component](/packages/design-system/inline-edit/docs/inline-editable-textfield).

  If you are seeking guidance on how to upgrade the inline edit component from a previous
  version, see [this upgrade guide](/packages/design-system/inline-edit/docs/upgrade-guide).

  ## Usage

  ${code`
  import InlineEdit from '@uidu/inline-edit';
  `}

  ${(
    <Example
      packageName="@uidu/inline-edit"
      Component={require('../examples/00-basic-usage').default}
      title="Basic usage"
      source={require('!!raw-loader!../examples/00-basic-usage').default}
    />
  )}

  The inline edit component is designed to be flexible, allowing various types of input fields.

  ${(
    <Example
      packageName="@uidu/inline-edit"
      Component={require('../examples/01-textarea-usage').default}
      title="Textarea usage"
      source={require('!!raw-loader!../examples/01-textarea-usage').default}
    />
  )}

  ${(
    <Example
      packageName="@uidu/inline-edit"
      Component={require('../examples/02-select-usage').default}
      title="Select usage"
      source={require('!!raw-loader!../examples/02-select-usage').default}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/InlineEdit')}
      heading="InlineEdit Props"
    />
  )}
`;
