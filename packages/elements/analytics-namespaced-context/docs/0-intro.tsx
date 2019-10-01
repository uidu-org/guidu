import { md, code } from '@uidu/docs';

export default md`
  # Fabric Elements analytics context

  The main purpose of this component is to provide a namespace for Fabric Elements contextual data related to @uidu/analytics framework.
  Rather than AnalyticsContext from @uidu/analytics, please use FabricElementsAnalyticsContext.


  ## Installation

${code`
  npm install @uidu/analytics-namespaced-context
  # or
  yarn add @uidu/analytics-namespaced-context
`}

  ## Using the component

  Example firing an analytics-next event:

${code`
import * as React from 'react';
import {
  withAnalyticsEvents,
  createAndFireEvent,
  AnalyticsListener,
  WithAnalyticsEventsProps
} from '@uidu/analytics';
import { FabricElementsAnalyticsContext } from '@uidu/analytics-namespaced-context';

export type Props = WithAnalyticsEventsProps & {
  onClick: (e) => void;
};

class DummyComponent extends React.Component<Props> {
  static displayName = 'DummyComponent';

  render() {
    return (
      <div id="dummy" onClick={this.props.onClick}>
        Test
      </div>
    );
  }
}

export const DummyComponentWithAnalytics = withAnalyticsEvents({
  onClick: createAndFireEvent('fabric-elements')({
      action: 'someAction',
      actionSubject: 'someComponent',
      eventType: 'ui',
    })
})(DummyComponent);

const listenerHandler = (event, context) => {
  console.log('event: ', event, ' context: ', context);
};

const myOnClickHandler = (e): void => {
  console.log('component clicked');
}

// Pass the analyticsWebClient instance created by the Product
ReactDOM.render(
  <div>
    <AnalyticsListener onEvent={listenerHandler} channel="fabricElements">
      <div>
        <FabricElementsAnalyticsContext data={{ greeting: 'hello' }}>
          <DummyComponentWithAnalytics onClick={myOnClickHandler} />
        </FabricElementsAnalyticsContext>
      </div>
    </AnalyticsListener>
  </div>,
  container,
);
`}
`;
