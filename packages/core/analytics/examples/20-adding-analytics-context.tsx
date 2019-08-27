import Button from '@uidu/button';
import React from 'react';
import { AnalyticsContext, AnalyticsListener, UIAnalyticsEvent } from '../src';

const SaveButton = () => (
  <Button
    appearance="primary"
    onClick={(
      e: React.MouseEvent<HTMLElement>,
      analyticsEvent: UIAnalyticsEvent,
    ) => {
      analyticsEvent.fire();
    }}
  >
    Save
  </Button>
);

const App = () => (
  <AnalyticsListener
    onEvent={({ context }) => console.log('Event context:', context)}
  >
    <AnalyticsContext data={{ issueId: 123 }}>
      <AnalyticsContext data={{ panel: 'right' }}>
        <SaveButton />
      </AnalyticsContext>
    </AnalyticsContext>
  </AnalyticsListener>
);

export default App;
