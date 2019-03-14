import * as React from 'react';
import { code, md, Example, Props } from '@uidu/docs';

export default md`
  Turns a URL into a card with metadata sourced from either:

  - a vendor or...
  - a custom fetch function that can be provided.

  _Note_: this package uses an AbortController, so you might need to provide a polyfill for that.

  ## Usage

  ${code`import { Provider, Card } from '@uidu/smart-card';`}

  ${(
    <Example
      Component={require('../examples/0-intro').default}
      title="An editable example"
      source={require('!!raw-loader!../examples/0-intro')}
    />
  )}

${(
  <Props
    heading="renderCardWithData Props"
    props={require('!!extract-react-types-loader!../src/Card/renderCardWithData')}
  />
)}

`;
