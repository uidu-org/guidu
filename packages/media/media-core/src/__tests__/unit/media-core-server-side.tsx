/**
 * @jest-environment node
 */
import * as React from 'react';
import { Component } from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { ContextFactory } from '../../';

class Example extends Component {
  constructor(props: any) {
    super(props);
    const context = ContextFactory.create({
      authProvider: () =>
        Promise.resolve({
          clientId: '',
          token: '',
          baseUrl: '',
        }),
    });

    context.file.getFileState('1');
  }

  render() {
    return <div />;
  }
}

test('media-core context server side rendering', async () => {
  expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
});
