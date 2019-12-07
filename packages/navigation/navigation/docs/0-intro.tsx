import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`

  # Navigation
  Navigation is a very flexible tool for building navigational components.
  The two main components are \`Navigation\` and \`GlobalNavigation\`.

  They both receive a schema or children containing istructions on which components to render.

  ## Usage

  ${code`import Navigation, { GlobalNavigation } from '@uidu/navigation';`}

  ## Components Hierarchy
  Schema may differ a lot depending on application needs, but it's important to understand component hierarchy and main functionalities.

  ${code`
  NavigationGroup 1
    - NavigationItem 1.1
      - NavigationSubItem 1.1.1
      - NavigationSubItem 1.1.2
    - NavigationItem 1.2
      - NavigationSubItem 1.2.1
      - NavigationSubItem 1.2.2
  NavigationGroup 2
    - NavigationItem 2.1
      - ...
  `}

  \`NavigationGroup\` is a wrapper component between two lists. It may have an heading, which is usually only informational, and allow for separating menu sections. It can't be toggled, it's there to stay.

  \`NavigationItem\` is the main component. It can be toggled (default if it has subitems) and can have floating actions on hover. Like all the items it can have a before or after component

  \`NavigationSubItem\` it's Item's child, share same properties except it can't be toggled. SubItems should not have subitems.



  ${(
    <Example
      packageName="@uidu/navigation"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic')}
      overflowHidden
      fullWidth
    />
  )}

  ${(
    <Example
      packageName="@uidu/navigation"
      Component={require('../examples/Full').default}
      title="Kitchen Sink"
      source={require('!!raw-loader!../examples/Full')}
      overflowHidden
      fullWidth
    />
  )}


  ${(
    <Example
      packageName="@uidu/navigation"
      Component={require('../examples/Icon').default}
      title="Icon Navigation"
      source={require('!!raw-loader!../examples/Icon')}
      overflowHidden
      fullWidth
    />
  )}

  ${(
    <Props
      heading="Button Props"
      props={require('!!extract-react-types-loader!../src/components/GlobalNavigation')}
    />
  )}
`;
