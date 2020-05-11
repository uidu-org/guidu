import React from 'react';
import ReactDOM from 'react-dom';
import zoid from 'zoid';

function App({}) {
  const MyZoidComponent = zoid.create({
    tag: 'my-tag',
    url:
      'https://uidu.local:8443/campaigns/Z2lkOi8vdWlkdS9Eb25hdGlvbkNhbXBhaWduLzM1/donate',
  });

  const MyZoidReactComponent = MyZoidComponent.driver('react', {
    React,
    ReactDOM,
  });
  return <MyZoidReactComponent customText="XYZ" />;
}

export default App;
