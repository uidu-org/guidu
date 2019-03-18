import * as React from 'react';
import { mount } from 'enzyme';
import FeatureFlag, {
  LaunchDarklyClientProviderForTesting as Provider,
} from '../../../FeatureFlag';

it('should get feature flag value', () => {
  const variation = jest.fn().mockReturnValueOnce(true);
  const children = jest.fn();
  mount(
    <Provider value={() => ({ variation })}>
      <FeatureFlag name="my-feature-flag">{children}</FeatureFlag>,
    </Provider>,
  );
  expect(variation).toHaveBeenCalledWith('my-feature-flag', false);
  expect(children).toHaveBeenCalledWith(true);
});

it('should get disabled feature flag by default', () => {
  const variation = jest.fn().mockReturnValueOnce(false);
  const children = jest.fn();
  mount(
    <Provider value={() => ({ variation })}>
      <FeatureFlag name="my-feature-flag">{children}</FeatureFlag>
    </Provider>,
  );
  expect(variation).toHaveBeenCalledWith('my-feature-flag', false);
  expect(children).toHaveBeenCalledWith(false);
});

it('should get enabled feature flag when enabledByDefault is set', () => {
  const variation = jest.fn().mockReturnValueOnce(false);
  const children = jest.fn();
  mount(
    <Provider value={() => ({ variation })}>
      <FeatureFlag name="my-feature-flag" enabledByDefault>
        {children}
      </FeatureFlag>
    </Provider>,
  );
  expect(variation).toHaveBeenCalledWith('my-feature-flag', true);
  expect(children).toHaveBeenCalledWith(false);
});
