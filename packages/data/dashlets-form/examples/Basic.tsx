import cubejs from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import { ScrollableContainer, ShellBody, ShellMain } from '@uidu/shell';
import React, { useRef } from 'react';
import DashletsForm from '../src';

export default function Basic({}) {
  const cubejsApi = useRef(
    cubejs('', { apiUrl: 'http://localhost:4000/cubejs-api/v1' }),
  );

  return (
    <CubeProvider cubejsApi={cubejsApi.current}>
      <ShellMain>
        <ShellBody>
          <ScrollableContainer>
            <DashletsForm
              cubejsApi={cubejsApi.current}
              handleSubmit={console.log}
            />
          </ScrollableContainer>
        </ShellBody>
      </ShellMain>
    </CubeProvider>
  );
}
