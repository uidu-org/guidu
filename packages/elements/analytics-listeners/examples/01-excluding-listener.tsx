import { AnalyticsContext } from '@uidu/analytics';
import * as React from 'react';
import FabricAnalyticsListeners, { FabricChannel } from '../src';
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

const myOnClickHandler = () => {
  console.log('Button clicked ! Yay!');
};

function Example() {
  return (
    <FabricAnalyticsListeners
      client={createAnalyticsWebClientMock()}
      excludedChannels={[FabricChannel.guidu]}
    >
      <div>
        <p>Excluding analytics listener</p>
        <DummyElementsComponent onClick={myOnClickHandler} />

        <AnalyticsContext data={{ issueId: 100, greeting: 'hello' }}>
          <AnalyticsContext data={{ issueId: 200 }}>
            <DummyElementsComponentWithAttributes onClick={myOnClickHandler} />
          </AnalyticsContext>
        </AnalyticsContext>

        <DummyGuiduComponent onClick={myOnClickHandler} />
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
