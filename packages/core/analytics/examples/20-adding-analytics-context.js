// @flow
import React from 'react';
import Button from '@uidu/button';
import { AnalyticsContext, AnalyticsListener } from '../src';

const SaveButton = () => (
  <Button
    appearance="primary"
    onClick={(e, analytic) => {
      analytic.fire();
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
