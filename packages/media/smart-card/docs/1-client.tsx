import { md, code } from '@uidu/docs';

export default md`
  # Intro

  The Client is basically a state and data fetch manager for multiple smart cards.

  ## Providing a custom fetch implementation

  Say you have a mechnism to handle certain types of links. You can utilise that for smart cards. You'll need to build a function that will return an Promise of ResolveResponse. Having that, you can use a Provider to provide a "custom" client:

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

  ## Customizing Client

  You can set the timeout for cache. Meaning that when resolving happens, the resolved data will be good for \`date.now + lifespan\`.

  Also, you can pass a custom function that will return "current time".

  ${code`
  new Client({
    cacheLifespan: 60000,                  // 60s
    getNowTimeFn: () => mockedDate.now()), // mock the time
  })
  `}

  The cards will delay showing loading indicator. You can control that behaviour with an option:

  ${code`
  new Client({
    loadingStateDelay: 5000 // show loading animation after 5s
  })
  `}

  ## ResolveResponse type

  ${code`
  type RemoteResourceAuthConfig = {
    key: string;
    displayName: string;
    url: string;
  };

  type ResolveResponse = {
    meta: {
      visibility: 'public' | 'restricted' | 'other' | 'not_found';
      access: 'granted' | 'unauthorized' | 'forbidden';
      auth: RemoteResourceAuthConfig[];
      definitionId: string;
    };
    data?: {
      [name: string]: any;
    };
  }
  `}

  ## Internal workflow

  You don't have to worry about these details unless you become a maintainer.

  Internally, when a card appears on the page, it will register itself to the client. As such a client will know which card to update of a certain url has been requested.

  While resolving the url, the Client will match a definitionId to a URL, therefore we'll have a path from a definitionId to a particular card.
`;
