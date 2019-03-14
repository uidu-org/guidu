import { md, code } from '@uidu/docs';

export default md`
# Intro

The Provider component has one purpose: provide a custom client to cards:

${code`
const myDefinitionId = uuid.v4();

  const customResponse = {
    meta: {
      visibility: 'public',
      access: 'granted',
      auth: [],
      definitionId: myDefinitionId,
    },
    data: {
      name: 'My Document',
    },
  } as ResolveResponse;

  class CustomClient extends Client {
    fetchData(url: string) {
      if (canIHandleThat(url)) {
        return Promise.resolve(customResponse);
      }
      return super.fetchData(url);
    }
  }
  ...
  <Provider client={new CustomClient()}>
    ...
    <Card appearance="block" url={specialCaseUrl} />
    ...
  </Provider>
...
`}

As such, we can customise the way the URL will be handeled.
`;
