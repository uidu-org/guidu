import { Example, md } from '@uidu/docs';
import React from 'react';

export default md`
  ### Typography

  Heading mixins for [Styled Components](https://www.styled-components.com/).
  If you're using another css-in-js solution you can use \`typography.headingSizes\` instead.
  Refer to the [design documentation](https://atlassian.design/guidelines/product/foundations/typography) for more information.

  ${(
    <Example
      highlight="3,12-20"
      packageName="@uidu/theme"
      Component={require('../examples/typography').default}
      source={require('!!raw-loader!../examples/typography').default}
      title="Heading mixins"
    />
  )}

  ${(
    <Example
      highlight=""
      packageName="@uidu/theme"
      Component={require('../examples/fonts').default}
      source={require('!!raw-loader!../examples/fonts').default}
      title="Fonts"
    />
  )}

  ### Elevation

  This will elevate an element (using box-shadow) over varying heights.

  ${(
    <Example
      packageName="@uidu/theme"
      Component={require('../examples/elevation').default}
      source={require('!!raw-loader!../examples/elevation').default}
      title=""
    />
  )}

  ### Focus ring

  When creating your own custom interactive element you can use this mixin in any css-in-js solution to give it its own focus ring.

  ${(
    <Example
      highlight="3,9,21-26"
      packageName="@uidu/theme"
      Component={require('../examples/focus-ring').default}
      source={require('!!raw-loader!../examples/focus-ring').default}
      title="Focusable elements"
    />
  )}

  ### Visually hidden

  This agnostic mixin will visually hide an element,
  taking it out of the page flow,
  but still allow screen readers to read it.

  ${(
    <Example
      highlight="4,7"
      packageName="@uidu/theme"
      Component={require('../examples/assistive').default}
      source={require('!!raw-loader!../examples/assistive').default}
      title=""
    />
  )}
`;
