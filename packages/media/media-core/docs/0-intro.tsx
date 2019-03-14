import * as React from 'react';
import { md, code, Example } from '@uidu/docs';

export default md`
  This package is required by other Media Components, and should not be used
  directly.

  It holds shared code between Media Components, such as:

  * models
  * providers
  * interfaces

  ## Usage

  \`Context\` is the main object that is created with \`ContextFactory\`. It can
  be created using either \`token\` and either \`clientId\` or \`asapIssuer\`.

  ${code`
import { Context, ContextConfig, ContextFactory } from '@uidu/media-core';

const authProvider = ({ collectionName }) =>
  new Promise((resolve, reject) => {
    resolve({
      token: 'token-that-was-recieved-in-some-async-way',
      clientId: 'some-client-id',
      baseUrl: 'http://example.com',
      //  asapIssuer: 'asap-issuer'
    });
  });
const config: ContextConfig = {
  authProvider,
};
const context: Context = ContextFactory.create(config);
  `}

  ${(
    <Example
      Component={require('../examples/1-get-file').default}
      title="Get File"
      source={require('!!raw-loader!../examples/1-get-file')}
    />
  )}
`;
