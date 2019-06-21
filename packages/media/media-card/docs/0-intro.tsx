import { Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
This component provides 2 exports:

  1.  Card
  2.  CardView

  ### Note:

  Don't forget to add polyfills for fetch, ES6 & ES7 to your product build if you want to target older browsers.
  We recommend the use of [babel-preset-env](https://babeljs.io/docs/plugins/preset-env/) & [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)

  ## Usage

${(
  <Example
    Component={require('../examples/Basic').default}
    title="File Card"
    source={require('!!raw-loader!../examples/Basic')}
  />
)}

${(
  <Props
    heading="Card Props"
    props={require('!!extract-react-types-loader!../src/components/MediaCard')}
  />
)}
`;
