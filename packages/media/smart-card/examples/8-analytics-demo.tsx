import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { Card, Client, Provider, ResolveResponse } from '..';
import { AnalyticsListener } from '@atlaskit/analytics-next';

const responses = {
  resolved: {
    meta: {
      access: 'granted',
      visibility: 'public',
      definitionId: 'd1',
      auth: [],
    },
    data: {
      name: 'this is a document',
    },
  } as ResolveResponse,
  unauth: {
    meta: {
      access: 'unauthorized',
      visibility: 'restricted',
      definitionId: 'd2',
      auth: [],
    },
  } as ResolveResponse,
};

class CustomClient extends Client {
  constructor(private resp: ResolveResponse) {
    super();
  }
  fetchData(): Promise<ResolveResponse> {
    return Promise.resolve(this.resp);
  }
}

const resolvingClient = new CustomClient(responses.resolved);
const unauthClient = new CustomClient(responses.unauth);

class Example extends React.Component {
  state = {
    c1Event: null,
    c2Event: null,
  };
  render() {
    return (
      <Page>
        <Grid>
          <GridColumn>
            <AnalyticsListener
              channel="media"
              onEvent={(evt: any) => this.setState({ c1Event: evt.payload })}
            >
              <h4>Resolved response</h4>
              <Provider client={resolvingClient}>
                <Card url="http://some.public.url" appearance="inline" />
              </Provider>
              <div>
                <h5>The event's payload:</h5>
                <pre>
                  {this.state.c1Event
                    ? JSON.stringify(this.state.c1Event, null, 2)
                    : 'nothing happened yet'}
                </pre>
              </div>
            </AnalyticsListener>
          </GridColumn>

          <GridColumn>
            <AnalyticsListener
              channel="media"
              onEvent={(evt: any) => this.setState({ c2Event: evt.payload })}
            >
              <h4>Unauth response</h4>
              <Provider client={unauthClient}>
                <Card url="http://some.unauth.url" appearance="inline" />
              </Provider>
              <div>
                <h5>The event's payload:</h5>
                <pre>
                  {this.state.c2Event
                    ? JSON.stringify(this.state.c2Event, null, 2)
                    : 'nothing happened yet'}
                </pre>
              </div>
            </AnalyticsListener>
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}

export default () => <Example />;
