// @flow
import React from 'react';
import { md, Props, code } from '@uidu/docs';

export default md`
  A best practice, server-side-render friendly wrapper on [React Portals](https://reactjs.org/docs/portals.html).

  Portals are used for rendering parts of a React component tree into a different
  part of the DOM. This is particularly useful for UI components that need
  to appear over the top of other components. Examples of these components are
  \`@uidu/modal-dialog\`, \`@uidu/flag\` and \`@uidu/tooltip\`.

  ## Usage

  This example renders a \`<div />\` and \`<h2 />\` into a Portal.

  ${code`
import React from 'react';
import Portal from '@uidu/portal';

const Modal = () => (
  <Portal>
    <div>
      <h2>Modal dialog heading</h2>
    </div>
  </Portal>
)
`}

  ${(
    <Props
      heading="Portal Props"
      props={require('!!extract-react-types-loader!../src/components/Portal')}
    />
  )}
`;
