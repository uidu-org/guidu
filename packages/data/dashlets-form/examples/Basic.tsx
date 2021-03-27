import cubejs from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import React from 'react';
import { IntlProvider } from 'react-intl';
import DashletsForm from '../src';

const cubejsApi = cubejs('', { apiUrl: 'http://localhost:4000/cubejs-api/v1' });

export default function Basic({}) {
  return (
    <IntlProvider locale="en">
      <CubeProvider cubejsApi={cubejsApi}>
        <ShellMain>
          <ShellBody>
            <ScrollableContainer>
              <DashletsForm handleSubmit={console.log} />
            </ScrollableContainer>
          </ShellBody>
        </ShellMain>
      </CubeProvider>
    </IntlProvider>
  );
}
