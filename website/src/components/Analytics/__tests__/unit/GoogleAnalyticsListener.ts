import ReactGA from 'react-ga';
import * as GoogleAnalyticsListener from '../../GoogleAnalyticsListener';

jest.mock('react-ga');

describe('GA', () => {
  test('It should initialise', () => {
    GoogleAnalyticsListener.initializeGA();
    expect(ReactGA.initialize).toHaveBeenCalled();
  });
});
