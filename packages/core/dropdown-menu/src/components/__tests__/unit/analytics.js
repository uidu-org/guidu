// @flow
import { withAnalyticsEvents, createAndFireEvent } from '@uidu/analytics';
import {
  name as packageName,
  version as packageVersion,
} from '../../../version.json';
import '../../../components/DropdownMenuStateless';

// This is a global mock for this file that will mock all components wrapped with analytics
// and replace them with an empty SFC that returns null. This includes components imported
// directly in this file and others imported as dependencies of those imports.
jest.mock('@uidu/analytics', () => ({
  withAnalyticsEvents: jest.fn(() => jest.fn(() => () => null)),
  withAnalyticsContext: jest.fn(() => jest.fn(() => () => null)),
  createAndFireEvent: jest.fn(() => jest.fn(args => args)),
}));

describe('DropdownMenuStateless', () => {
  it('should be wrapped with analytics events', () => {
    expect(createAndFireEvent).toHaveBeenCalledWith('uidu');
    expect(withAnalyticsEvents).toHaveBeenLastCalledWith({
      onOpenChange: {
        action: 'toggled',
        actionSubject: 'dropdownMenu',
        attributes: {
          componentName: 'dropdownMenu',
          packageName,
          packageVersion,
        },
      },
    });
  });
});
