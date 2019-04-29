// @flow

import React from 'react';
import { code, md, Example, Props } from '@uidu/docs';

export default md`
  Badges are visual indicators for numeric values such as tallies and scores.
  They're commonly used before and after the label of the thing they're
  quantifying.

  They must be used singly after a single item name, and have only numbers.

  * Use lozenges for statuses.
  * Use labels to call out tags and high-visibility attributes.
  * Use a tooltip if you want to indicate units.

  ## Usage

  The \`default\` export gives you full badge functionality and automatically formats the number you priovide it.

${code`
  import Badge from '@uidu/badge';

  // Displays: 99+
  <Badge>{1000}</Badge>

  // Displays: 999+
  <Badge max={999}>{1000}</Badge>
`}

  ## Container

  The named \`Container\` export retains the styling of a normal badge, but without formatting. This means you can compose in whatever information you need to.

${code`
  import { Container } from '@uidu/badge';

  // Displays: <em>Something</em>
  <Container><em>Something</em></Container>

`}

  _Beware that putting arbitrary content inside of a badge might cause it to take on an unitended look._

  ## Format

  The \`Format\` export can be used to compose your own badge together, or if you need the badge style formatting somewhere else.

  ${code`
  import { Container, Format } from '@uidu/badge';

  // Displays: <em>999+</em>
  <Container><em><Format>{1000}</Format></em></Container>
`}

  ${(
    <Example
      packageName="@uidu/badge"
      Component={require('../examples/0-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic')}
    />
  )}

  ${(
    <Props
      heading="Badge Props"
      props={require('!!extract-react-types-loader!../src/components')}
    />
  )}
`;
