// @flow
import React from 'react';

// Imports from your component should be imported from `../src`
// If this is done, 2 magic things happen:
// 1. On the website, the paths are transformed to the package name to make the example a copyable snippet
// 2. When the example is uploaded to codesandbox, no files from `src` will be included,
// and instead files will just be pulled from npm.
import MyComponent, { MySubComponent } from '../src';
// DO NOT import anything else from src. That indicates we are doing something wrong.

// While ideally examples are standalone renderable files, sometimes providing clear code that demonstrates
// a point can mean hiding some parts away. This stops examples being copyable snippets, but they will
// still work correctly with codesandboxer.
import someUtil from './utils/someUtil';

// Here we see a simple implementation of a component that does not require state.
// We write our functional component and render it.
// You can use any kind of component you want, as long as the export for the file
// is a valid react component.
const Example = () => (
  <MyComponent specificProp={() => <MySubComponent value="something" />}>
    Here we see a simple implementation of a component that does not require
    state. We write our functional component and render it
  </MyComponent>
);

export default Example;
