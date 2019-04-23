// @flow

import React, { type Node } from 'react';
import { md, Example, Props } from '@atlaskit/docs';
import Lozenge from '@atlaskit/lozenge';

const Deprecated = ({ children }: { children: Node }) => (
  <h3>
    {children}{' '}
    <Lozenge appearance="removed" isBold>
      deprecated
    </Lozenge>
  </h3>
);

const Experimental = ({ children }: { children: Node }) => (
  <h3>
    {children} <Lozenge appearance="moved">experimental</Lozenge>
  </h3>
);

export default md`
  The theme package is a combined component and utility set, exporting abstractions for creating and consuming themes, as well as utilities for both audiences.

  ${<Experimental>Creating themes</Experimental>}

  The \`createTheme\` function is at the heart of the theming API and is used in the global theme and reset theme. Much like React's \`createContext\`, the \`createTheme\` function returns you a \`Consumer\` and \`Provider\` that you use to get and set a theme, respectively.

  ${(
    <Example
      packageName="@atlaskit/theme"
      Component={require('../examples/creating-themes').default}
      source={require('!!raw-loader!../examples/creating-themes')}
      title="Creating themes"
    />
  )}

  ${<Experimental>Theming components</Experimental>}

  Whenever you create a new theme, it provides you a context specific to that theme. When theming a component, you use this context to provide a theme for your component. It is recommended that you, at the very least, export the provider for your theme so consumers can customise the look and feel of your component.
  
  ${(
    <Example
      packageName="@atlaskit/theme"
      Component={require('../examples/theming-components').default}
      source={require('!!raw-loader!../examples/theming-components')}
      title="Creating themes"
    />
  )}

  ${<Experimental>The global theme</Experimental>}

  The global theme is the \`default\` export of the theme package. It is defined by using the \`createTheme\` function, so it will give you both a \`Consumer\` and \`Provider\` for you to use or customise as you see fit.
    
  ${(
    <Example
      packageName="@atlaskit/theme"
      Component={require('../examples/global-theme').default}
      source={require('!!raw-loader!../examples/global-theme')}
      title="Creating themes"
    />
  )}

  ${<Experimental>Reset</Experimental>}

  The \`Reset\` component applies CSS reset styles to select descendant nodes according to the ADG.

  ${(
    <Example
      packageName="@atlaskit/theme"
      Component={require('../examples/reset').default}
      source={require('!!raw-loader!../examples/reset')}
      title="Reset"
    />
  )}

  As shown above, the \`Reset\` comes with defaults based on the ADG, but it also allows you to customise it via a theme.

  ${(
    <Example
      packageName="@atlaskit/theme"
      Component={require('../examples/themed-reset').default}
      source={require('!!raw-loader!../examples/themed-reset')}
      title="Themed reset"
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/Reset')}
    />
  )}

  ___Unlike in the deprecated \`AtlaskitThemeProvider\`, this is not applied automatically - or globally - so it is up to you to put this in your app where appropriate.___

  ${<Deprecated>AtlaskitThemeProvider</Deprecated>}

  Theme provider is a wrapper component that accepts a 'mode'. This mode is passed down to styled components below it, using the styled components library theme provider, while also providing some defaults.

  Native Atlaskit components are set up to have both a 'light' mode and a 'dark' mode, and will respond to this, defaulting to the 'light' mode if no theme is provided.

  The AtlaskitThemeProvider should wrap your entire app, to ensure all components are set to the same theme. Mixing dark and light moded components will severely impact accessibility.

  ${(
    <Example
      packageName="@atlaskit/theme"
      Component={require('../examples/deprecated-theme-provider').default}
      source={require('!!raw-loader!../examples/deprecated-theme-provider')}
      title="DEPRECATED AtlaskitThemeProvider"
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/AtlaskitThemeProvider')}
    />
  )}

  ${<Deprecated>getTheme()</Deprecated>}

  Returns the current theme based on props. This has been deprecated in favour of simply accessing whatever you need using the \`Consumer\` or \`Theme\` components.

  _Due to the fact that this helper was never documented and is now deprecated, we will not document its usage and this only serves as a notice that it will be removed in the future._

  ${<Deprecated>math</Deprecated>}

  Exports of curried functions that do math operations in styled component primitives. They have been deprecated in favour of performing your own mathematical operations using plain JavaScript.

  _Due to the fact that this helper was never documented and is now deprecated, we will not document its usage and this only serves as a notice that it will be removed in the future._

  ${<Deprecated>themed()</Deprecated>}

  The \`themed()\` function is a way to define a theme for usage exclusively within Styled Component's primitives. Since we're moving to using React Context, this has been deprecated in favour of defining a theme with the \`Theme\` component.

  _Due to the fact that this helper was never documented and is now deprecated, we will not document its usage and this only serves as a notice that it will be removed in the future._
`;
