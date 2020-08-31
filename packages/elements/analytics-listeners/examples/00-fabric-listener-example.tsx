import { AnalyticsContext } from '@uidu/analytics';
import * as React from 'react';
import FabricAnalyticsListeners from '../src/FabricAnalyticsListeners';
import { FabricChannel } from '../src/types';
import {
  createAnalyticsWebClientMock,
  createComponentWithAnalytics,
  createComponentWithAttributesWithAnalytics,
} from './helpers';

const DummyElementsComponent = createComponentWithAnalytics(
  FabricChannel.elements,
);
const DummyElementsComponentWithAttributes = createComponentWithAttributesWithAnalytics(
  FabricChannel.elements,
);
const DummyGuiduComponent = createComponentWithAnalytics(FabricChannel.guidu);
const DummyNavigationComponent = createComponentWithAnalytics(
  FabricChannel.navigation,
);

const myOnClickHandler = () => {
  console.log('Button clicked ! Yay!');
};

function Example() {
  return (
    <FabricAnalyticsListeners client={createAnalyticsWebClientMock()}>
      <div>
        <DummyElementsComponent onClick={myOnClickHandler} />

        <AnalyticsContext data={{ issueId: 100, greeting: 'hello' }}>
          <AnalyticsContext data={{ issueId: 200 }}>
            <DummyElementsComponentWithAttributes onClick={myOnClickHandler} />
          </AnalyticsContext>
        </AnalyticsContext>

        <DummyGuiduComponent onClick={myOnClickHandler} />

        <AnalyticsContext
          data={{
            component: 'page',
            packageName: '@uidu/page',
            packageVersion: '2.0.1',
            attributes: { pageName: 'myPage' },
            source: 'homePage',
          }}
        >
          <AnalyticsContext
            data={{
              component: 'myComponent',
              packageName: '@uidu/my-component',
              packageVersion: '1.0.0',
              attributes: { customAttr: true },
              source: 'componentPage',
            }}
          >
            <DummyNavigationComponent onClick={myOnClickHandler} />
          </AnalyticsContext>
        </AnalyticsContext>
      </div>
    </FabricAnalyticsListeners>
  );
}

Object.assign(Example, {
  meta: {
    noListener: true,
  },
});

export default Example;
