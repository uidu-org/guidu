import { code, Example, md } from '@uidu/docs';
import React from 'react';

export default md`
  ### Layers

  These are fixed values to use for layering elements with \`z-index\`.

  ${code`
import { layers } from '@uidu/theme';

// layers properties return a number.
() => <div style={{ zIndex: layers.card() }} />
  `}

  ${(
    <Example
      packageName="@uidu/theme"
      Component={require('../examples/layers').default}
      source={require('!!raw-loader!../examples/layers').default}
      title="Definitions"
    />
  )}

  ### Border radius

  When wanting to add some rounding to an elements edges,
  use this.

${code`
import { borderRadius } from '@uidu/theme';

// borderRadius returns a number.
() => <div style={{ borderRadius: borderRadius() />
`}

  ### Grid size

  Grid unit that should be used for all sizing calculations.
  Refer to the [design documentation](https://atlassian.design/guidelines/product/foundations/grid) for more information.

${code`
import { gridSize } from '@uidu/theme';

// gridSize returns a number.
() => <div style={{ width: gridSize() * 10 />
`}
`;
