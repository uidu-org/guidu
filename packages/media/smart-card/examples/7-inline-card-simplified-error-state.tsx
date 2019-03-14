import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { Card, Client, Provider, ResolveResponse } from '..';
import { ClientConfig } from '../src/Client';

class UnAuthCustomClient extends Client {
  constructor(config: ClientConfig) {
    super(config);
  }
  fetchData(): Promise<ResolveResponse> {
    return Promise.resolve({
      meta: {
        access: 'unauthorized',
        visibility: 'restricted',
        definitionId: 'd1',
        auth: [],
      },
    } as ResolveResponse);
  }
}

class ErroringCustomClient extends Client {
  constructor(config: ClientConfig) {
    super(config);
  }
  fetchData(url: string): Promise<ResolveResponse> {
    return Promise.reject(`Can't resolve from ${url}`);
  }
}

const unAuthClient = new UnAuthCustomClient({ loadingStateDelay: 1000 });
const erroringClient = new ErroringCustomClient({ loadingStateDelay: 1000 });

class Example extends React.Component {
  render() {
    return (
      <Page>
        <Grid>
          <GridColumn>
            <h4>Unauthorized response</h4>
            <Provider client={unAuthClient}>
              <Card url="http://some.unauth.url" appearance="inline" />
            </Provider>
            <hr />
            <h4>Error response</h4>
            <Provider client={erroringClient}>
              <Card url="http://some.error.url" appearance="inline" />
            </Provider>
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}

export default () => <Example />;
