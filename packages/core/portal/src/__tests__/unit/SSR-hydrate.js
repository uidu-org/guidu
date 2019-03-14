// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import exenv from 'exenv';
import Portal from '../..';

jest.mock('exenv', () => ({
  get canUseDOM() {
    return false;
  },
}));

jest.spyOn(global.console, 'error');

afterEach(() => {
  jest.resetAllMocks();
});

afterAll(() =>
  document
    .querySelectorAll('.atlaskit-portal')
    .forEach(e => e.parentNode && e.parentNode.removeChild(e)),
);

const App = () => (
  <div>
    <Portal>
      <h1>:wave:</h1>
    </Portal>
    <p>Hi everyone</p>
  </div>
);

test('should ssr then hydrate portal correctly', () => {
  const canUseDom = jest.spyOn(exenv, 'canUseDOM', 'get');
  // server-side
  canUseDom.mockReturnValue(false);
  const serverHTML = ReactDOMServer.renderToString(<App />);
  // client-side
  canUseDom.mockReturnValue(true);
  const elem = document.createElement('div');
  elem.innerHTML = serverHTML;
  ReactDOM.hydrate(<App />, elem);
  expect(console.error).not.toBeCalled();
  expect(elem.getElementsByTagName('h1')).toHaveLength(0);
  expect(document.getElementsByClassName('atlaskit-portal')).toHaveLength(1);
});
