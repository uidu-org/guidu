import React from 'react';
import ReactDOM from 'react-dom';
import * as zoid from 'zoid/dist/zoid.frameworks';

const MyZoidComponent = zoid.create({
  tag: 'my-tag',
  url:
    'https://uidu.local:8443/campaigns/Z2lkOi8vdWlkdS9Eb25hdGlvbkNhbXBhaWduLzM1/donate',
});

function App({}) {
  const MyZoidReactComponent = MyZoidComponent.driver('react', {
    React,
    ReactDOM,
  });
  return <MyZoidReactComponent customText="XYZ" />;
}

export default App;
