// @flow

import React, { type Node } from 'react';
import { mount } from 'enzyme';
import {
  createAndFireEvent,
  withAnalyticsEvents,
  AnalyticsListener,
} from '../..';

type Props = {
  onClick?: () => void,
  children: Node,
};

const Button = ({ onClick, children }: Props) => (
  <button onClick={onClick}>{children}</button>
);

it('should create and fire analytics event', () => {
  const onEvent = jest.fn();
  const createAndFireOnAtlaskit = createAndFireEvent('uidu');
  // written by the library
  const ButtonWithAnalytics = withAnalyticsEvents({
    onClick: createAndFireOnAtlaskit({ action: 'click' }),
  })(Button);
  // written by the consumer
  const AppButton = () => (
    <ButtonWithAnalytics onClick={(e, event) => event && event.fire()}>
      Save
    </ButtonWithAnalytics>
  );
  mount(
    <AnalyticsListener onEvent={onEvent}>
      <div>
        <AnalyticsListener channel="uidu" onEvent={onEvent}>
          <AppButton />
        </AnalyticsListener>
        ,
      </div>
    </AnalyticsListener>,
  )
    .find(Button)
    .simulate('click');
  expect(onEvent).toHaveBeenCalledTimes(2);
});
