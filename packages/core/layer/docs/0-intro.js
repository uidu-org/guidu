// @flow
import { code, md, Props } from '@uidu/docs';
import React from 'react';

export default md`

  # This package is for internal consumption only. Use at your own risk.

  The layer is responsible for the positioning of an element on a page. For example, you wrap a tooltip with a layer to make its position relative to a target. You can specify up to 12 different positions.

  If you use a layer with a component that could be opened or closed, you have to make sure you re-render the layer the first time you open the component, otherwise it will end up with a wrong position.

  ![Example of Layer](https://i.imgur.com/f2UkGw8.gif)

  ## Usage

  ### HTML

  This package exports the Layer React component.

  Import the component in your React app as follows:

  ${code`import Layer from '@uidu/layer';

  const myContent = <div>I'm going to be aligned to the right!</div>;

  ReactDOM.render(
    <Layer position="right middle" content={myContent}>
      <div>Some content</div>
    </Layer>,
    container,
  );
  `}

  Any content that is passed to Layer as children will always be rendered and any content passed through the \`content\` prop will be rendered aligned to the internal content.

${(
  <Props
    heading="Layer Props"
    props={require('!!extract-react-types-loader!../src/components/Layer')}
  />
)}

`;
